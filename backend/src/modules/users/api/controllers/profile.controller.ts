/* libs */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

/* guards */
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { PlanGuard } from '@modules/auth/rbac/api/guards/plans.guard';

/* decorators */
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';

/* dto */
import { UserResponseDto } from '../dto/user-response.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

/* shared */
import { OK } from '@shared/constants/http-status';

/* service */
import { UsersService } from '@users/domain/services/users.service';
import { IUser } from '@modules/users/domain/interfaces/user.interface';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Plan } from '@modules/auth/rbac/api/decorators/plans.decorator';
import { Permissions } from '@modules/auth/rbac/api/decorators/permissions.decorator';
import { UserPermission } from '@modules/users/domain/enums/permissions.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';

@Controller('users/profile')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(OK)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(
    GearPlan.FREE,
    GearPlan.TRIAL,
    GearPlan.GARAGE,
    GearPlan.PERFORMANCE,
    GearPlan.ELITE,
  )
  @Get()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: OK,
    type: UserResponseDto,
  })
  async profile(@CurrentUser() user: any): Promise<IUser | null> {
    return this.usersService.findById(user, user.sub);
  }

  @HttpCode(OK)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(
    GearPlan.FREE,
    GearPlan.TRIAL,
    GearPlan.GARAGE,
    GearPlan.PERFORMANCE,
    GearPlan.ELITE,
  )
  @Patch()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({
    status: OK,
    type: UserResponseDto,
  })
  async updateProfile(
    @CurrentUser() user: any,
    @Body() data: UpdateUserDto,
  ): Promise<IUser | null> {
    return this.usersService.update(user, user.sub, data);
  }

  @HttpCode(OK)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(
    GearPlan.FREE,
    GearPlan.TRIAL,
    GearPlan.GARAGE,
    GearPlan.PERFORMANCE,
    GearPlan.ELITE,
  )
  @Patch('password')
  @ApiOperation({ summary: 'Update current user password' })
  @ApiBody({
    schema: {
      example: {
        currentPassword: '123456',
        newPassword: 'newStrongPassword123',
      },
    },
  })
  @ApiResponse({
    status: OK,
    description: 'Password updated successfully',
  })
  async updatePassword(
    @CurrentUser() user: any,
    @Body()
    data: UpdatePasswordDto,
  ): Promise<IUser | null> {
    return this.usersService.updatePassword(user.sub, data);
  }
}
