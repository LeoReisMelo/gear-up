import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class UpdateLastActivityUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(sessionId: string) {
    return this.repo.updateLastActivity(sessionId);
  }
}
