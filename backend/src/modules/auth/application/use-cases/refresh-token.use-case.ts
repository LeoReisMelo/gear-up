import { JwtAdapter } from '@modules/auth/domain/adapters/jwt.adapter';
import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';

export class RefreshTokenUseCase {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly jwt: JwtAdapter,
  ) {}

  async execute(refreshToken: string) {
    const payload = this.jwt.verifyRefresh(refreshToken);

    const session = await this.sessionsRepository.findById(payload.sessionId);

    if (!session || !session.isActive) {
      throw new Error('SESSION_INVALID');
    }

    const newAccessToken = this.jwt.sign({
      sub: session.userId,
      tenantId: session.tenantId,
      sessionId: session.sessionId,
    });

    return {
      accessToken: newAccessToken,
    };
  }
}
