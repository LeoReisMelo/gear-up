import { ForbiddenException } from '@nestjs/common';

export class PlanForbiddenException extends ForbiddenException {
  constructor(message: string) {
    super(message);
    this.name = 'PlanForbiddenException';
  }
}
