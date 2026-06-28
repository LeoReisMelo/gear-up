/* libs */
import { Inject, Injectable } from '@nestjs/common';

/* interfaces and enums */
import { IUser } from '../interfaces/user.interface';
import { IUserFilters } from '../interfaces/filters.interface';

/* use cases */
import { FindAllUsersUseCase } from '@modules/users/application/use-cases/find-all-users.use-case';
import { FindUserByIdUseCase } from '@modules/users/application/use-cases/find-user-by-id.use-case';
import { CreateSubordinateUserUseCase } from '@modules/users/application/use-cases/create-subordinate-user.use-case';
import { UpdateUserUseCase } from '@modules/users/application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@modules/users/application/use-cases/delete-user.use-case';

/* repositories */
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';
import { RolesRepository } from '@modules/roles/infra/repositories/roles.repository';

/* dto */
import { CreateUserDto } from '@modules/users/api/dto/create-user.dto';
import { UpdateUserDto } from '@modules/users/api/dto/update-user.dto';
import { UpdatePasswordUseCase } from '@modules/users/application/use-cases/update-password.use-case';
import { BcryptUtil } from '@shared/utils/crypto/bcrypt';
import { IUpdatePassword } from '../interfaces/update.interface';
import { GetOverviewUseCase } from '@modules/users/application/use-cases/get-overview.use-case';
import { GetActiveUsersUseCase } from '@modules/users/application/use-cases/get-active-users.use-case';
import { GetUsersByRoleUseCase } from '@modules/users/application/use-cases/get-users-by-role.use-case';
import { GetRecentUsersUseCase } from '@modules/users/application/use-cases/get-recent-users.use-case';
import { ExportUsersUseCase } from '@modules/users/application/use-cases/export-users.use-case';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(RolesRepository)
    private readonly rolesRepository: RolesRepository,
    @Inject(BcryptUtil)
    private readonly bcryptUtil: BcryptUtil,
  ) {}

  async findAll(
    currentUser: { tenantId?: string },
    filters?: IUserFilters,
  ): Promise<IUser[]> {
    const findAllUsers = new FindAllUsersUseCase(this.usersRepository);

    return findAllUsers.execute(currentUser, filters);
  }

  async findById(currentUser: { tenantId?: string }, id: string) {
    const findUserById = new FindUserByIdUseCase(this.usersRepository);

    return findUserById.execute(currentUser, id);
  }

  async create(currentUser: { tenantId?: string }, user: CreateUserDto) {
    const createUser = new CreateSubordinateUserUseCase(
      this.usersRepository,
      this.rolesRepository,
    );

    return createUser.execute(currentUser, user);
  }

  async update(
    currentUser: { tenantId?: string },
    id: string,
    user: UpdateUserDto,
  ) {
    const updateUser = new UpdateUserUseCase(this.usersRepository);

    return updateUser.execute(currentUser, id, user);
  }

  async updatePassword(id: string, data: IUpdatePassword) {
    const updateUser = new UpdatePasswordUseCase(
      this.usersRepository,
      this.bcryptUtil,
    );

    return updateUser.execute(id, data);
  }

  async delete(currentUser: { tenantId?: string }, id: string) {
    const deleteUser = new DeleteUserUseCase(this.usersRepository);

    return deleteUser.execute(currentUser, id);
  }

  async getOverview(currentUser: any) {
    const getOverview = new GetOverviewUseCase(this.usersRepository);

    return getOverview.execute(currentUser);
  }

  async getActiveUsers(currentUser: any) {
    const getActiveUsers = new GetActiveUsersUseCase(this.usersRepository);

    return getActiveUsers.execute(currentUser);
  }

  async getUsersByRole(currentUser: any) {
    const getUsersByRole = new GetUsersByRoleUseCase(this.usersRepository);

    return getUsersByRole.execute(currentUser);
  }

  async getRecentUsers(currentUser: any) {
    const getRecentUsers = new GetRecentUsersUseCase(this.usersRepository);

    return getRecentUsers.execute(currentUser);
  }

  async exportUsers(currentUser: any, format: string) {
    const exportUsers = new ExportUsersUseCase(this.usersRepository);

    return exportUsers.execute(currentUser, format);
  }
}
