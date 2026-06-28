/* interfaces and enums */
import { IUserPayload } from '@modules/users/domain/interfaces/user.interface';
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserStatus } from '@modules/users/domain/enums/status.enum';

/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

/* exceptions */
import { UserEmailAlreadyExists } from '@modules/users/exceptions/user-email-already-exists.exception';
import { UserUsernameAlreadyExists } from '@modules/users/exceptions/user-username-already-exists.exception';

/* shared */
import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';

import { ZERO } from '@shared/constants/magic-numbers';
import { TenantStatus } from '@modules/tenant/domain/enums/tenant-status.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';
import { SubscriptionStatus } from '@modules/tenant/domain/enums/subscription-status.enum';
import { IRoleRepository } from '@modules/roles/domain/repositories/roles.repository';

export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly tenantRepository: ITenantRepository,
    private readonly rolesRepository: IRoleRepository,
    private readonly bcryptUtil: IBcryptUtil,
  ) {}

  async execute(user: IUserPayload) {
    if (!user?.password) {
      throw new Error('');
    }
    const emailExists = await this.usersRepository.findByEmail(user.email);

    if (emailExists) {
      throw new UserEmailAlreadyExists();
    }

    const usernameExists = await this.usersRepository.findByUsername(
      user.username,
    );

    if (usernameExists) {
      throw new UserUsernameAlreadyExists();
    }

    const password = await this.bcryptUtil.hash(user.password);

    const tenant = await this.tenantRepository.create({
      name: 'Oficina do Leonardo',
      ownerUserId: '',
      status: TenantStatus.ACTIVE,
      settings: {
        currency: 'BRL',
        timezone: 'São Paulo',
      },
      subscription: {
        plan: GearPlan.FREE,
        status: SubscriptionStatus.INACTIVE,
        startedAt: new Date(),
      },
    });

    const role = await this.rolesRepository.findByName(
      user.role ?? UserRole.ADMIN,
    );

    return this.usersRepository.create({
      ...user,
      email: user.email.trim().toLowerCase(),
      username: user.username.trim().toLowerCase(),
      password,
      role: role?.id,
      status: UserStatus.ACTIVE,
      isEmailVerified: false,
      failedLoginAttempts: ZERO,
      deletedAt: null,
      tenantId: tenant.id,
    });
  }
}
