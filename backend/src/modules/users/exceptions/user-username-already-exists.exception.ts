/* libs */
import { ConflictException } from '@nestjs/common';

export class UserUsernameAlreadyExists extends ConflictException {
  constructor(message = 'User username already exists') {
    super(message);
    this.name = 'UserUsernameAlreadyExists';
  }
}
