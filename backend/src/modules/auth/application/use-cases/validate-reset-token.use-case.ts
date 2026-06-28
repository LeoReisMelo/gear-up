import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';

export class ValidateResetTokenUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(token: string) {
    const users = await this.usersRepository.findAll({});

    const user = users.find((u) => u.passwordResetToken === token);

    if (!user) throw new Error('INVALID_TOKEN');

    if (
      !user.passwordResetExpiresAt ||
      user.passwordResetExpiresAt < new Date()
    ) {
      throw new Error('TOKEN_EXPIRED');
    }

    return { valid: true };
  }
}
