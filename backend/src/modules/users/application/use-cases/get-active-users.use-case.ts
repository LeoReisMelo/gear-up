import { UserStatus } from '@modules/users/domain/enums/status.enum';

export class GetActiveUsersUseCase {
  constructor(private readonly usersRepository: any) {}

  async execute(currentUser: any) {
    const users = await this.usersRepository.findAll(currentUser);

    return users.filter((u) => u.status === UserStatus.ACTIVE);
  }
}
