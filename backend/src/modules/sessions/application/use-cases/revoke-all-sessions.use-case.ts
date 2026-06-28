import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class RevokeAllSessionsUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(currentUser: any, userId: string) {
    if (currentUser.userId !== userId && !currentUser.isAdmin) {
      throw new Error('FORBIDDEN');
    }

    return this.repo.revokeAllByUserId(currentUser, userId);
  }
}
