/* libs */
import { PartialType } from '@nestjs/mapped-types';

/* dto */
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
