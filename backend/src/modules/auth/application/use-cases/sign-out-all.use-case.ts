import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';

export class SignOutAllUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute(currentUser: any) {
    return this.sessionsRepository.revokeAllByUserId(
      currentUser.tenantId,
      currentUser.userId,
    );
  }
}
