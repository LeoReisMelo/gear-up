/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';

export class FindUserByIdUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(currentUser: { tenantId?: string }, id: string) {
    return this.usersRepository.findById(currentUser, id);
  }
}
