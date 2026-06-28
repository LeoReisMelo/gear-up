import { ISessionPayload } from '@modules/sessions/domain/interfaces/sessions.interface';
import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class CreateSessionUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(data: ISessionPayload) {
    return this.repo.create({
      ...data,
      isActive: true,
      lastActiveAt: new Date(),
    });
  }
}
