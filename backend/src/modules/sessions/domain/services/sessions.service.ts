/* libs */
import { Injectable, Inject } from '@nestjs/common';

/* use cases */
import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';
import { CreateSessionUseCase } from '@modules/sessions/application/use-cases/create-session.use-case';
import { ISessionPayload } from '../interfaces/sessions.interface';
import { FindUserSessionsUseCase } from '@modules/sessions/application/use-cases/find-user-sessions.use-case';
import { RevokeSessionUseCase } from '@modules/sessions/application/use-cases/revoke-sessions.use-case';
import { RevokeAllSessionsUseCase } from '@modules/sessions/application/use-cases/revoke-all-sessions.use-case';
import { UpdateLastActivityUseCase } from '@modules/sessions/application/use-cases/update-last-activity.use-case';
import { UpdateRefreshTokenUseCase } from '@modules/sessions/application/use-cases/update-refresh-token.use-case';

@Injectable()
export class SessionsService {
  constructor(
    @Inject('SessionsRepository')
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async findByUserId(currentUser: { tenantId?: string }, userId: string) {
    const useCase = new FindUserSessionsUseCase(this.sessionsRepository);

    return useCase.execute(currentUser, userId);
  }

  async createSession(data: ISessionPayload) {
    const useCase = new CreateSessionUseCase(this.sessionsRepository);

    return useCase.execute(data);
  }

  async revokeSession(
    currentUser: { userId: string; tenantId?: string },
    sessionId: string,
  ) {
    const useCase = new RevokeSessionUseCase(this.sessionsRepository);

    return useCase.execute(currentUser, sessionId);
  }

  async revokeAllSessions(
    currentUser: { userId: string; tenantId?: string },
    userId: string,
  ) {
    const useCase = new RevokeAllSessionsUseCase(this.sessionsRepository);

    return useCase.execute(currentUser, userId);
  }

  async updateLastActivity(sessionId: string) {
    const useCase = new UpdateLastActivityUseCase(this.sessionsRepository);

    return useCase.execute(sessionId);
  }

  async updateRefreshToken(sessionId: string, refreshTokenHash: string) {
    const useCase = new UpdateRefreshTokenUseCase(this.sessionsRepository);

    return useCase.execute(sessionId, refreshTokenHash);
  }
}
