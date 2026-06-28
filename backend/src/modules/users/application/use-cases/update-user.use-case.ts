/* interfaces and enums*/
import { IUser } from '@modules/users/domain/interfaces/user.interface';

/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';

/* exceptions */
import { TenantRequiredForSubordinateUserCreation } from '@modules/users/exceptions/tenant-required-for-subordinate-user-creation.exception';
import { UserEmailAlreadyExists } from '@modules/users/exceptions/user-email-already-exists.exception';
import { UserUsernameAlreadyExists } from '@modules/users/exceptions/user-username-already-exists.exception';

export class UpdateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(
    currentUser: { tenantId?: string },
    id: string,
    user: Partial<IUser>,
  ) {
    if (!currentUser?.tenantId) {
      throw new TenantRequiredForSubordinateUserCreation();
    }

    if (user?.email) {
      const emailExists = await this.usersRepository.findByEmail(user.email);

      if (emailExists) {
        throw new UserEmailAlreadyExists();
      }
    }
    if (user?.username) {
      const usernameExists = await this.usersRepository.findByUsername(
        user.username,
      );

      if (usernameExists) {
        throw new UserUsernameAlreadyExists();
      }
    }

    return this.usersRepository.update(id, user, currentUser.tenantId);
  }
}
