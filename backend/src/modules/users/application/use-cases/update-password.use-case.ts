/* interfaces */
import { IUpdatePassword } from '@modules/users/domain/interfaces/update.interface';

/* repositories */
import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';

/* utils */
import { IBcryptUtil } from '@shared/utils/crypto/contracts/bcrypt-util.contract';

/* exceptions */
import { UserNotFound } from '@modules/users/exceptions/user-not-found.exception';
import { CurrentPasswordIsIncorrect } from '@modules/users/exceptions/current-password-is-incorrect.exception';

export class UpdatePasswordUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptUtil: IBcryptUtil,
  ) {}

  async execute(userId: string, data: IUpdatePassword) {
    const user = await this.usersRepository.findByIdWithPassword(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const passwordMatch = await this.bcryptUtil.compare(
      data.currentPassword,
      user.password,
    );

    if (!passwordMatch) {
      throw new CurrentPasswordIsIncorrect();
    }

    const hashedPassword = await this.bcryptUtil.hash(data.newPassword);

    return this.usersRepository.update(userId, {
      password: hashedPassword,
      lastPasswordChangedAt: new Date(),
    });
  }
}
