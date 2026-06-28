import { ZERO, UM } from '@shared/constants/magic-numbers';

export class GetUsersByRoleUseCase {
  constructor(private readonly usersRepository: any) {}

  async execute(currentUser: any) {
    const users = await this.usersRepository.findAll(currentUser);

    const grouped = users.reduce((acc, user) => {
      const role = user.role ?? 'UNKNOWN';

      acc[role] = (acc[role] || ZERO) + UM;

      return acc;
    }, {});

    return grouped;
  }
}
