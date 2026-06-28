import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

/* shared */
import { OK } from '@shared/constants/http-status';

/* guards */
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { PlanGuard } from '@modules/auth/rbac/api/guards/plans.guard';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';
import { UsersService } from '@modules/users/domain/services/users.service';

@Controller('users/statistics')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class StatisticsController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(OK)
  @Get()
  @ApiOperation({ summary: 'User statistics overview' })
  async overview(@CurrentUser() user: any) {
    return this.usersService.getOverview(user);
  }

  @HttpCode(OK)
  @Get('active')
  @ApiOperation({ summary: 'Active users' })
  async activeUsers(@CurrentUser() user: any) {
    return this.usersService.getActiveUsers(user);
  }

  @HttpCode(OK)
  @Get('by-role')
  @ApiOperation({ summary: 'Users grouped by role' })
  async usersByRole(@CurrentUser() user: any) {
    return this.usersService.getUsersByRole(user);
  }

  @HttpCode(OK)
  @Get('recent')
  @ApiOperation({ summary: 'Recently created users' })
  async recentUsers(@CurrentUser() user: any) {
    return this.usersService.getRecentUsers(user);
  }
}
