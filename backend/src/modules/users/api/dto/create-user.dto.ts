/* class-validator */
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';

/* class-transformer */
import { Type } from 'class-transformer';

/* swagger */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/* interfaces and enums */
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { IUser } from '@modules/users/domain/interfaces/user.interface';

class UserAddressDto {
  @ApiPropertyOptional({
    example: 'Rua das Flores',
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({
    example: '123',
  })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional({
    example: 'São Paulo',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    example: 'SP',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({
    example: '01000-000',
  })
  @IsOptional()
  @IsString()
  zipCode?: string;
}

export class CreateUserDto implements Omit<
  IUser,
  | 'password'
  | 'id'
  | 'isEmailVerified'
  | 'failedLoginAttempts'
  | 'createdAt'
  | 'updatedAt'
  | 'status'
  | 'tenantId'
> {
  @ApiProperty({
    example: 'Leonardo Reis',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'leonardo@email.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'leonardo',
  })
  @IsString()
  username!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiPropertyOptional({
    type: UserAddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserAddressDto)
  address?: UserAddressDto;
}
