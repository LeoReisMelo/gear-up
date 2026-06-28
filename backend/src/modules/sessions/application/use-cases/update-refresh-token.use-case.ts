import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class UpdateRefreshTokenUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(sessionId: string, refreshTokenHash: string) {
    return this.repo.updateRefreshToken(sessionId, refreshTokenHash);
  }
}
