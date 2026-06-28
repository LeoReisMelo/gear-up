import { ZERO } from '@shared/constants/magic-numbers';

export class GetRecentUsersUseCase {
  constructor(private readonly usersRepository: any) {}

  async execute(currentUser: any) {
    const users = await this.usersRepository.findAll(currentUser);

    return users
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(ZERO, 10);
  }
}
