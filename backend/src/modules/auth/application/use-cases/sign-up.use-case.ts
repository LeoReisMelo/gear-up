import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';
import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserStatus } from '@modules/users/domain/enums/status.enum';
import { SubscriptionStatus } from '@modules/tenant/domain/enums/subscription-status.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';
import { ZERO } from '@shared/constants/magic-numbers';
import { IJwtService } from '../contracts/jwt.contract';
import { TenantStatus } from '@modules/tenant/domain/enums/tenant-status.enum';
import { IRoleRepository } from '@modules/roles/domain/repositories/roles.repository';

export class SignupUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly rolesRepository: IRoleRepository,
    private readonly bcrypt: IBcryptUtil,
    private readonly jwt: IJwtService,
  ) {}

  async execute(dto: any) {
    // 1. validar duplicidade
    const emailExists = await this.usersRepository.findByEmail(dto.email);
    if (emailExists) throw new Error('Email already exists');

    const usernameExists = await this.usersRepository.findByUsername(
      dto.username,
    );
    if (usernameExists) throw new Error('Username already exists');

    // 2. hash password
    const hashedPassword = await this.bcrypt.hash(dto.password);

    // 3. criar tenant (oficina)
    const tenant = await this.tenantRepository.create({
      name: dto.autoRepairShopName,
      ownerUserId: '', // vai preencher depois
      status: TenantStatus.ACTIVE,
      settings: {
        timezone: 'America/Sao_Paulo',
        currency: 'BRL',
      },
      subscription: {
        plan: GearPlan.FREE,
        status: SubscriptionStatus.ACTIVE,
        startedAt: new Date(),
      },
    });

    const role = await this.rolesRepository.findByName(UserRole.ADMIN);

    // 4. criar user OWNER
    const user = await this.usersRepository.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      username: dto.username.toLowerCase(),
      password: hashedPassword,
      role: role?.id,
      tenantId: tenant.id,
      status: UserStatus.ACTIVE,
      failedLoginAttempts: ZERO,
      isEmailVerified: false,
      deletedAt: null,
    });

    // 5. atualizar tenant owner
    await this.tenantRepository.update(tenant.id, {
      ownerUserId: user.id,
    });

    // 6. gerar token
    const token = this.jwt.sign({
      sub: user.id,
      tenantId: tenant.id,
      role: user.role,
      sessionId: '',
    });

    return {
      accessToken: token,
      user,
      tenant,
    };
  }
}
