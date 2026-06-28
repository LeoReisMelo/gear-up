import { IUsersRepository } from '@modules/users/domain/repositories/users.repository';
import { IJwtService } from '../contracts/jwt.contract';

export class SendEmailVerificationUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly jwt: IJwtService,
  ) {}

  async execute(currentUser: any) {
    const user = await this.usersRepository.findById(
      currentUser,
      currentUser.userId,
    );

    if (!user) {
      throw new Error();
    }

    const token = this.jwt.sign({
      sub: user.id,
      tenantId: user.tenantId,
      sessionId: '',
      type: 'EMAIL-VERIFICATION',
    });

    return {
      token,
    };
  }
}
