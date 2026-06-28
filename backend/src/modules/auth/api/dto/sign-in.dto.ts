/* libs */
import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/* shared */
import { SEIS } from '@shared/constants/magic-numbers';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @MinLength(SEIS)
  password!: string;
}
