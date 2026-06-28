import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AcceptInviteDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do usuário ao aceitar o convite',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'user@email.com',
    description: 'Email do usuário (deve bater com o convite)',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '12345678',
    description: 'Senha inicial do usuário',
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
