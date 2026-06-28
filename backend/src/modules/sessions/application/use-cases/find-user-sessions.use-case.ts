import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class FindUserSessionsUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(currentUser: any, userId: string) {
    if (currentUser.tenantId) {
      return this.repo.findByUserId(currentUser, userId);
    }

    return this.repo.findByUserId({}, userId);
  }
}
