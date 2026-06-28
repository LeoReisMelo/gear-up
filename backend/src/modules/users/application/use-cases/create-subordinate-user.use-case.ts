/* interfaces and enums */
import { IUserPayload } from '@modules/users/domain/interfaces/user.interface';
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserStatus } from '@modules/users/domain/enums/status.enum';

/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';
import { IRoleRepository } from '@modules/roles/domain/repositories/roles.repository';

/* exceptions */
import { UserEmailAlreadyExists } from '@modules/users/exceptions/user-email-already-exists.exception';
import { UserUsernameAlreadyExists } from '@modules/users/exceptions/user-username-already-exists.exception';
import { TenantRequiredForSubordinateUserCreation } from '@modules/users/exceptions/tenant-required-for-subordinate-user-creation.exception';

/* shared */
import { ZERO } from '@shared/constants/magic-numbers';

export class CreateSubordinateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly rolesRepository: IRoleRepository,
  ) {}

  async execute(currentUser: { tenantId?: string }, user: IUserPayload) {
    if (!currentUser?.tenantId) {
      throw new TenantRequiredForSubordinateUserCreation();
    }

    const emailExists = await this.usersRepository.findByEmail(user.email);

    if (emailExists) {
      throw new UserEmailAlreadyExists();
    }

    const usernameExists = await this.usersRepository.findByUsername(
      user.username,
    );

    if (usernameExists) {
      throw new UserUsernameAlreadyExists();
    }

    const role = await this.rolesRepository.findByName(
      user.role ?? UserRole.CUSTOMER,
    );

    return this.usersRepository.create({
      name: user.name,
      email: user.email.trim().toLowerCase(),
      username: user.username.trim().toLowerCase(),
      password: '',
      role: role?.id,
      tenantId: currentUser.tenantId,
      status: UserStatus.INACTIVE,
      isEmailVerified: false,
      failedLoginAttempts: ZERO,
      deletedAt: null,
    });
  }
}
