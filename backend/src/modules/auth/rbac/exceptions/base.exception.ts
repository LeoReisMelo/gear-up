import { ForbiddenException } from '@nestjs/common';

export class RbacForbiddenException extends ForbiddenException {
  constructor(message: string) {
    super(message);
    this.name = 'RbacForbiddenException';
  }
}
