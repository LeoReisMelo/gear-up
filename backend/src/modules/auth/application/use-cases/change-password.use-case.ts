import { UsersRepository } from '@modules/users/infra/repositories/users.repository';
import { BcryptUtil } from '@shared/utils/crypto/bcrypt';

export class ChangePasswordUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly bcrypt: BcryptUtil,
  ) {}

  async execute(currentUser: any, data: any) {
    const user = await this.usersRepository.findByIdWithPassword(
      currentUser.userId,
    );

    if (!user) {
      throw new Error();
    }

    const valid = await this.bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!valid) throw new Error('INVALID_PASSWORD');

    const hashed = await this.bcrypt.hash(data.newPassword);

    return this.usersRepository.update(
      user.id,
      { password: hashed },
      currentUser.tenantId,
    );
  }
}
