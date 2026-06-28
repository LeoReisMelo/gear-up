import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';

export class SignOutUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute(currentUser: any) {
    return this.sessionsRepository.revokeSession(currentUser.sessionId);
  }
}
