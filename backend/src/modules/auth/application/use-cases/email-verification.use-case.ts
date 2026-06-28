import { UsersRepository } from '@modules/users/infra/repositories/users.repository';

export class VerifyEmailUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(token: string) {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());

    return this.usersRepository.update(payload.userId, {
      isEmailVerified: true,
    });
  }
}
