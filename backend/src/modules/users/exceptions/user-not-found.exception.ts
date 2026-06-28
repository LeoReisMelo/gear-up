/* libs */
import { NotFoundException } from '@nestjs/common';

export class UserNotFound extends NotFoundException {
  constructor(message = 'User not found') {
    super(message);
    this.name = 'UserNotFound';
  }
}
