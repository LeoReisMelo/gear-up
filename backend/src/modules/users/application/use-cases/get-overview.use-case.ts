import { UserStatus } from '@modules/users/domain/enums/status.enum';

export class GetOverviewUseCase {
  constructor(private readonly usersRepository: any) {}

  async execute(currentUser: any) {
    const users = await this.usersRepository.findAll(currentUser);

    const total = users.length;

    const active = users.filter((u) => u.status === UserStatus.ACTIVE).length;

    const inactive = total - active;

    return {
      total,
      active,
      inactive,
    };
  }
}
