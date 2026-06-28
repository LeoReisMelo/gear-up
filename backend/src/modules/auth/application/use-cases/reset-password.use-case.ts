import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';
import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';

export class ResetPasswordUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcrypt: IBcryptUtil,
  ) {}

  async execute(data: { token: string; password: string }) {
    const users = await this.usersRepository.findAll({});

    const user = users.find((u) => u.passwordResetToken === data.token);

    if (!user) throw new Error('INVALID_TOKEN');

    const hashed = await this.bcrypt.hash(data.password);

    await this.usersRepository.update(user.id, {
      password: hashed,
      passwordResetToken: null,
      passwordResetExpiresAt: null,
      lastPasswordChangedAt: new Date(),
    });

    return { success: true };
  }
}
