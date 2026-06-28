/* libs */
import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

/* pipes */
import { ValidateMongoId } from '@shared/pipes/validate-mongo-id';

/* shared */
import { OK } from '@shared/constants/http-status';
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { UserPermission } from '@modules/users/domain/enums/permissions.enum';
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { Permissions } from '@modules/auth/rbac/api/decorators/permissions.decorator';
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';
import { Plan } from '@modules/auth/rbac/api/decorators/plans.decorator';
import { Roles } from '@modules/auth/rbac/api/decorators/roles.decorator';
import { PlanGuard } from '@modules/auth/rbac/api/guards/plans.guard';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';
import { AuditService } from '@modules/audit-logs/domain/services/audit-logs.service';

@Controller('audit-logs')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @HttpCode(OK)
  @Get()
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_READ)
  @Plan(GearPlan.FREE)
  @ApiOperation({ summary: 'List audit logs' })
  async findAll(@CurrentUser() currentUser: any) {
    return this.auditService.findAll(currentUser);
  }

  @HttpCode(OK)
  @Get(':id')
  @Roles(UserRole.ADMIN)
  @Permissions(UserPermission.USERS_READ)
  @Plan(GearPlan.FREE)
  @ApiOperation({ summary: 'Find audit log by id' })
  async findById(
    @CurrentUser() currentUser: any,
    @Param('id', ValidateMongoId) id: string,
  ) {
    return this.auditService.findById(currentUser, id);
  }
}
