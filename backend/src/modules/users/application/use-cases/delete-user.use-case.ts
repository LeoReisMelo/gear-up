/* repositories */
import { TenantRequiredForSubordinateUserCreation } from '@modules/users/exceptions/tenant-required-for-subordinate-user-creation.exception';
import { IUsersRepository } from '../../domain/repositories/users.repository';

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(currentUser: { tenantId?: string }, id: string) {
    if (!currentUser?.tenantId) {
      throw new TenantRequiredForSubordinateUserCreation();
    }

    await this.usersRepository.delete(id, currentUser.tenantId);
  }
}
