/* libs */
import { ConflictException } from '@nestjs/common';

export class UserEmailAlreadyExists extends ConflictException {
  constructor(message = 'User email already exists') {
    super(message);
    this.name = 'UserEmailAlreadyExists';
  }
}
