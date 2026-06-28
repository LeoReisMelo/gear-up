import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';
import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';
import { IJwtService } from '../contracts/jwt.contract';
import { UnauthorizedException } from '@nestjs/common';
import { ZERO } from '@shared/constants/magic-numbers';
import { randomUUID } from 'crypto';
import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';

export class SignInUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcrypt: IBcryptUtil,
    private readonly jwt: IJwtService,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async execute(
    dto: { email: string; password: string },
    metadata?: { ip?: string; userAgent?: string },
  ) {
    const user = await this.usersRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.bcrypt.compare(
      dto.password,
      user.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const sessionId = randomUUID();

    const session = await this.sessionsRepository.create({
      userId: user.id,
      tenantId: user.tenantId,
      sessionId,
      userAgent: metadata?.userAgent,
      ip: metadata?.ip,
      isActive: true,
      lastActiveAt: new Date(),
    });

    const accessToken = this.jwt.sign({
      sub: user.id,
      tenantId: user.tenantId,
      role: user.role,
      sessionId,
    });

    const refreshToken = this.jwt.signRefresh({
      sub: user.id,
      tenantId: user.tenantId,
      sessionId,
    });

    await this.sessionsRepository.updateRefreshToken(sessionId, refreshToken);

    await this.usersRepository.update(user.id, {
      lastLoginAt: new Date(),
      failedLoginAttempts: ZERO,
      lastLoginIp: metadata?.ip,
    });

    return {
      accessToken,
      refreshToken,
      user,
      session,
    };
  }
}
