/* libs */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

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
import { OK, CREATED, NO_CONTENT } from '@shared/constants/http-status';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';
import { InvitesService } from '@modules/invites/domain/services/invites.service';
import { CreateInviteDto } from '../dto/create-invites.dto';
import { AcceptInviteDto } from '../dto/accept-invites.dto';

@Controller('invites')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class InviteController {
  constructor(private readonly invitesService: InvitesService) {}

  @HttpCode(CREATED)
  @Post()
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_WRITE)
  @ApiOperation({ summary: 'Create user invite' })
  async createInvite(@Body() data: CreateInviteDto, @CurrentUser() user: any) {
    return this.invitesService.createInvite(user, data);
  }

  @HttpCode(OK)
  @Get()
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_READ)
  @ApiOperation({ summary: 'List invites' })
  async listInvites(@CurrentUser() user: any) {
    return this.invitesService.listInvites(user);
  }

  @HttpCode(NO_CONTENT)
  @Delete(':inviteId')
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_WRITE)
  @ApiOperation({ summary: 'Cancel invite' })
  async cancelInvite(
    @Param('inviteId') inviteId: string,
    @CurrentUser() user: any,
  ) {
    return this.invitesService.cancelInvite(user, inviteId);
  }

  @HttpCode(OK)
  @Post(':inviteId/resend')
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_WRITE)
  @ApiOperation({ summary: 'Resend invite email' })
  async resendInvite(
    @Param('inviteId') inviteId: string,
    @CurrentUser() user: any,
  ) {
    return this.invitesService.resendInvite(user, inviteId);
  }

  @HttpCode(OK)
  @Post(':token/accept')
  @ApiOperation({ summary: 'Accept invite' })
  async acceptInvite(
    @Param('token') token: string,
    @Body() data: AcceptInviteDto,
  ) {
    return this.invitesService.acceptInvite(token, data);
  }
}
