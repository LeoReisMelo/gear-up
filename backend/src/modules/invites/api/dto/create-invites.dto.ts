import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({
    example: 'user@email.com',
    description: 'Email do usuário convidado',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Role que o usuário terá ao aceitar o convite',
  })
  @IsString()
  @IsNotEmpty()
  role!: string;
}
