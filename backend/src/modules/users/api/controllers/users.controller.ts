/* libs */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

/* interfaces and enums */
import { IUser } from '@modules/users/domain/interfaces/user.interface';
import { UserPermission } from '@modules/users/domain/enums/permissions.enum';
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';

/* services */
import { UsersService } from '@users/domain/services/users.service';

/* dto */
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersFiltersDto } from '../dto/filters-user.dto';

/* pipes */
import { ValidateMongoId } from '@shared/pipes/validate-mongo-id';

/* guards */
import { RbacGuard } from '@modules/auth/rbac/api/guards/rbac.guard';
import { TenantGuard } from '@modules/auth/rbac/api/guards/tenant.guard';
import { JwtAuthGuard } from '@modules/auth/rbac/api/guards/jwt-auth.guard';
import { PlanGuard } from '@modules/auth/rbac/api/guards/plans.guard';

/* decorators */
import { Permissions } from '@modules/auth/rbac/api/decorators/permissions.decorator';
import { Plan } from '@modules/auth/rbac/api/decorators/plans.decorator';
import { Roles } from '@modules/auth/rbac/api/decorators/roles.decorator';
import { CurrentUser } from '@modules/auth/rbac/api/decorators/current-user.decorator';

/* shared */
import { CREATED, NO_CONTENT, OK } from '@shared/constants/http-status';

@Controller('users')
@UseGuards(JwtAuthGuard, TenantGuard, RbacGuard, PlanGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(OK)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Permissions(UserPermission.USERS_READ)
  @Plan(
    GearPlan.FREE,
    GearPlan.TRIAL,
    GearPlan.GARAGE,
    GearPlan.PERFORMANCE,
    GearPlan.ELITE,
  )
  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: OK,
    description: 'List of users',
    type: UserResponseDto,
    isArray: true,
  })
  async findAll(
    @CurrentUser() user: any,
    @Query() filters?: UsersFiltersDto,
  ): Promise<IUser[]> {
    return this.usersService.findAll(user, filters);
  }

  @HttpCode(OK)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Permissions(UserPermission.USERS_READ)
  @Plan(
    GearPlan.FREE,
    GearPlan.TRIAL,
    GearPlan.GARAGE,
    GearPlan.PERFORMANCE,
    GearPlan.ELITE,
  )
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: OK, description: 'User found', type: UserResponseDto })
  async findById(
    @CurrentUser() user: any,
    @Param('id', ValidateMongoId) id: string,
  ): Promise<IUser | null> {
    return this.usersService.findById(user, id);
  }

  @HttpCode(CREATED)
  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(GearPlan.TRIAL, GearPlan.GARAGE, GearPlan.PERFORMANCE, GearPlan.ELITE)
  @ApiOperation({
    summary: 'Create user (tenant scoped)',
    description: 'Creates a subordinate user inside current tenant',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: CREATED,
    type: UserResponseDto,
  })
  async create(
    @CurrentUser() user: any,
    @Body() data: CreateUserDto,
  ): Promise<IUser> {
    return this.usersService.create(user, data);
  }

  @HttpCode(OK)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(GearPlan.TRIAL, GearPlan.GARAGE, GearPlan.PERFORMANCE, GearPlan.ELITE)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User update dto',
  })
  @ApiResponse({
    status: OK,
    description: 'User updated',
    type: UserResponseDto,
  })
  async update(
    @CurrentUser() user: any,
    @Param('id', ValidateMongoId) id: string,
    @Body() data: UpdateUserDto,
  ): Promise<IUser | null> {
    return this.usersService.update(user, id, data);
  }

  @HttpCode(NO_CONTENT)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Permissions(UserPermission.USERS_WRITE)
  @Plan(GearPlan.TRIAL, GearPlan.GARAGE, GearPlan.PERFORMANCE, GearPlan.ELITE)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user (soft delete)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: NO_CONTENT,
    description: 'User deleted',
  })
  async delete(
    @CurrentUser() user: any,
    @Param('id', ValidateMongoId) id: string,
  ): Promise<void> {
    await this.usersService.delete(user, id);
  }
}
