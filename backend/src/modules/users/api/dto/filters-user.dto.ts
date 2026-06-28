import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserStatus } from '@modules/users/domain/enums/status.enum';

export class UsersFiltersDto {
  @ApiPropertyOptional({
    description: 'Search global (name, email, username)',
    example: 'leo',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isEmailVerified?: boolean;

  @ApiPropertyOptional({
    enum: UserRole,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: UserStatus,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  updatedBy?: string;

  @ApiPropertyOptional({
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiPropertyOptional({
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastLoginAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastPasswordChangedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
