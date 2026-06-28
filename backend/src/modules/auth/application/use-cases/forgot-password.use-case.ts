import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';
import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';

export class ForgotPasswordUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcrypt: IBcryptUtil,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) return true; // não vazar existência

    const token = crypto.randomUUID();

    const hashedToken = await this.bcrypt.hash(token);

    await this.usersRepository.update(user.id, {
      passwordResetToken: hashedToken,
      passwordResetExpiresAt: new Date(Date.now() + 1000 * 60 * 30),
    });

    return {
      message: 'If email exists, reset link was sent',
      token, // futuramente email service envia isso
    };
  }
}
