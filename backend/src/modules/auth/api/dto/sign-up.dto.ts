/* libs */
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* shared */
import { SEIS } from '@shared/constants/magic-numbers';

export class SignupDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  username!: string;

  @ApiProperty()
  @MinLength(SEIS)
  password!: string;

  @ApiProperty()
  @IsString()
  autoRepairShopName!: string;
}
