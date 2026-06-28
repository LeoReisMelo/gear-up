/* libs */
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

/* services */

/* guards */
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { PlanGuard } from '@modules/auth/rbac/api/guards/plans.guard';

/* decorators */
import { Roles } from '@modules/auth/rbac/api/decorators/roles.decorator';
import { Permissions } from '@modules/auth/rbac/api/decorators/permissions.decorator';

/* enums */
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserPermission } from '@modules/users/domain/enums/permissions.enum';

/* shared */
import { OK, NO_CONTENT } from '@shared/constants/http-status';
import { SessionsService } from '@modules/sessions/domain/services/sessions.service';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';

@ApiTags('sessions')
@Controller('users/sessions')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @HttpCode(OK)
  @Get('me')
  @ApiOperation({ summary: 'List my active sessions' })
  @ApiResponse({ status: OK })
  async findMySessions(@CurrentUser() user: any) {
    return this.sessionsService.findByUserId(user.tenantId, user.sub);
  }

  @HttpCode(OK)
  @Get(':userId')
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_READ)
  @ApiOperation({ summary: 'List user sessions (admin)' })
  @ApiParam({ name: 'userId' })
  @ApiResponse({ status: OK })
  async findUserSessions(
    @CurrentUser() user: any,
    @Param('userId') userId: string,
  ) {
    return this.sessionsService.findByUserId(user.tenantId, userId);
  }

  @HttpCode(NO_CONTENT)
  @Delete(':sessionId')
  @ApiOperation({ summary: 'Revoke a session' })
  @ApiParam({ name: 'sessionId' })
  async revokeSession(
    @CurrentUser() user: any,
    @Param('sessionId') sessionId: string,
  ) {
    return this.sessionsService.revokeSession(user, sessionId);
  }

  @HttpCode(NO_CONTENT)
  @Delete()
  @ApiOperation({ summary: 'Revoke all sessions (logout all devices)' })
  async revokeAll(@CurrentUser() user: any, @Req() req: any) {
    return this.sessionsService.revokeAllSessions(req.user.id, user.tenantId);
  }

  @HttpCode(NO_CONTENT)
  @Delete('me')
  @ApiOperation({ summary: 'Revoke current session only' })
  async revokeCurrent(@Req() req: any) {
    const sessionId = req.user.sessionId;

    return this.sessionsService.revokeSession(sessionId, req.user.id);
  }
}
