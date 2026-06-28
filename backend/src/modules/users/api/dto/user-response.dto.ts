/* swagger */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/* interfaces and enums */
import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { UserStatus } from '@modules/users/domain/enums/status.enum';
import { IUser } from '@modules/users/domain/interfaces/user.interface';

export class UserResponseDto implements Omit<IUser, 'password'> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  tenantId!: string;

  @ApiProperty()
  role!: UserRole;

  @ApiProperty()
  isEmailVerified!: boolean;

  @ApiPropertyOptional()
  lastPasswordChangedAt?: Date | null;

  @ApiProperty()
  failedLoginAttempts!: number;

  @ApiPropertyOptional()
  createdBy?: string | null;

  @ApiPropertyOptional()
  updatedBy?: string | null;

  @ApiPropertyOptional()
  deletedAt?: Date | null;

  @ApiProperty({
    enum: UserStatus,
  })
  status!: UserStatus;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
