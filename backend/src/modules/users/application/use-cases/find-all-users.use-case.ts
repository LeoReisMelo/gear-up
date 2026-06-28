/* interfaces and enums */
import { IUserFilters } from '@modules/users/domain/interfaces/filters.interface';

/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';

export class FindAllUsersUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(currentUser: { tenantId?: string }, filters?: IUserFilters) {
    return this.usersRepository.findAll(currentUser, filters);
  }
}
