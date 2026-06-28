/* libs */
import { UnauthorizedException } from '@nestjs/common';

export class CurrentPasswordIsIncorrect extends UnauthorizedException {
  constructor(message = 'Current password is incorrect') {
    super(message);
    this.name = 'CurrentPasswordIsIncorrect';
  }
}
