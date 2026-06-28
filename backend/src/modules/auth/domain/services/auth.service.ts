/* libs */
import { SignupUseCase } from '@modules/auth/application/use-cases/sign-up.use-case';
import { TenantRepository } from '@modules/tenant/infra/repositories/tenant.repository';
import { UsersRepository } from '@modules/users/infra/repositories/users.repository';
import { Inject, Injectable } from '@nestjs/common';
import { BcryptUtil } from '@shared/utils/crypto/bcrypt';
import { JwtAdapter } from '../adapters/jwt.adapter';
import { SignInUseCase } from '@modules/auth/application/use-cases/sign-in.use-case';
import { RolesRepository } from '@modules/roles/infra/repositories/roles.repository';
import { SessionsRepository } from '@modules/sessions/infra/repositories/sessions.repository';
import { SignOutUseCase } from '@modules/auth/application/use-cases/sign-out.use-case';
import { SignOutAllUseCase } from '@modules/auth/application/use-cases/sign-out-all.use-case';
import { RefreshTokenUseCase } from '@modules/auth/application/use-cases/refresh-token.use-case';
import { ChangePasswordUseCase } from '@modules/auth/application/use-cases/change-password.use-case';
import { VerifyEmailUseCase } from '@modules/auth/application/use-cases/email-verification.use-case';
import { ForgotPasswordUseCase } from '@modules/auth/application/use-cases/forgot-password.use-case';
import { ValidateResetTokenUseCase } from '@modules/auth/application/use-cases/validate-reset-token.use-case';
import { ResetPasswordUseCase } from '@modules/auth/application/use-cases/reset-password.use-case';
import { SendEmailVerificationUseCase } from '@modules/auth/application/use-cases/send-email-verification.use-case';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
    @Inject(TenantRepository)
    private readonly tenantRepository: TenantRepository,
    @Inject(RolesRepository)
    private readonly rolesRepository: RolesRepository,
    @Inject(BcryptUtil)
    private readonly bcryptUtil: BcryptUtil,
    @Inject(JwtAdapter)
    private readonly jwt: JwtAdapter,
    @Inject(SessionsRepository)
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async signup(dto: any) {
    const signUp = new SignupUseCase(
      this.usersRepository,
      this.tenantRepository,
      this.rolesRepository,
      this.bcryptUtil,
      this.jwt,
    );

    return signUp.execute(dto);
  }

  signin(dto: any) {
    const signIn = new SignInUseCase(
      this.usersRepository,
      this.bcryptUtil,
      this.jwt,
      this.sessionsRepository,
    );

    return signIn.execute(dto);
  }

  async logout(currentUser: any) {
    const useCase = new SignOutUseCase(this.sessionsRepository);
    return useCase.execute(currentUser);
  }

  async logoutAll(currentUser: any) {
    const useCase = new SignOutAllUseCase(this.sessionsRepository);
    return useCase.execute(currentUser);
  }

  async refresh(refreshToken: string) {
    const useCase = new RefreshTokenUseCase(this.sessionsRepository, this.jwt);

    return useCase.execute(refreshToken);
  }

  async forgotPassword(email: string) {
    const useCase = new ForgotPasswordUseCase(
      this.usersRepository,
      this.bcryptUtil,
    );

    return useCase.execute(email);
  }

  async validateResetToken(token: string) {
    const useCase = new ValidateResetTokenUseCase(this.usersRepository);
    return useCase.execute(token);
  }

  async resetPassword(data: any) {
    const useCase = new ResetPasswordUseCase(
      this.usersRepository,
      this.bcryptUtil,
    );

    return useCase.execute(data);
  }

  async changePassword(currentUser: any, data: any) {
    const useCase = new ChangePasswordUseCase(
      this.usersRepository,
      this.bcryptUtil,
    );

    return useCase.execute(currentUser, data);
  }

  async sendEmailVerification(currentUser: any) {
    const useCase = new SendEmailVerificationUseCase(
      this.usersRepository,
      this.jwt,
    );

    return useCase.execute(currentUser);
  }

  async verifyEmail(token: string) {
    const useCase = new VerifyEmailUseCase(this.usersRepository);
    return useCase.execute(token);
  }
}
