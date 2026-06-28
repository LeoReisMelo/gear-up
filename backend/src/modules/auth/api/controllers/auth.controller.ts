import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '@users/domain/services/users.service';
import { CREATED, NO_CONTENT, OK } from '@shared/constants/http-status';
import { SignupDto } from '../dto/sign-up.dto';
import { AuthService } from '@modules/auth/domain/services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(NO_CONTENT)
  @Post('sign-out')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOperation({ summary: 'Logout current session' })
  async logout(@CurrentUser() user: any) {
    return this.authService.logout(user);
  }

  @HttpCode(NO_CONTENT)
  @Post('sign-out-all')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOperation({ summary: 'Logout all sessions from user' })
  async logoutAll(@CurrentUser() user: any) {
    return this.authService.logoutAll(user);
  }

  @HttpCode(OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using session' })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  // =========================
  // PROFILE
  // =========================

  @HttpCode(OK)
  @Get('profile')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOperation({ summary: 'Get authenticated user profile' })
  async profile(@CurrentUser() user: any) {
    return this.usersService.findById(user, user.userId);
  }

  // =========================
  // PASSWORD FLOW
  // =========================

  @HttpCode(NO_CONTENT)
  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset email' })
  async forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email);
  }

  @HttpCode(OK)
  @Post('validate-reset-token')
  @ApiOperation({ summary: 'Validate password reset token' })
  async validateResetToken(@Body() body: { token: string }) {
    return this.authService.validateResetToken(body.token);
  }

  @HttpCode(NO_CONTENT)
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using token' })
  async resetPassword(
    @Body()
    body: {
      token: string;
      password: string;
    },
  ) {
    return this.authService.resetPassword(body);
  }

  @HttpCode(NO_CONTENT)
  @Post('change-password')
  @UseGuards(JwtAuthGuard, TenantGuard)
  @ApiOperation({ summary: 'Change password (logged user)' })
  async changePassword(
    @CurrentUser() user: any,
    @Body()
    body: {
      currentPassword: string;
      newPassword: string;
    },
  ) {
    return this.authService.changePassword(user, body);
  }

  // =========================
  // EMAIL VERIFICATION
  // =========================

  @HttpCode(NO_CONTENT)
  @Post('send-email-verification')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Send email verification' })
  async sendEmailVerification(@CurrentUser() user: any) {
    return this.authService.sendEmailVerification(user);
  }

  @HttpCode(OK)
  @Post('verify-email/:token')
  @ApiOperation({ summary: 'Verify email using token' })
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @HttpCode(CREATED)
  @Post('sign-up')
  @ApiOperation({ summary: 'Create tenant + user (signup SaaS)' })
  @ApiBody({ type: SignupDto })
  @ApiResponse({ status: 201 })
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(OK)
  @Post('sign-in')
  @ApiOperation({ summary: 'Login in the system' })
  @ApiResponse({
    status: OK,
    description: 'Token',
    type: undefined,
    isArray: true,
  })
  async login(@Body() dto: SignInDto): Promise<any> {
    return this.authService.signin(dto);
  }
}
