import { RbacForbiddenException } from './base.exception';

export class InsufficientPermissionsException extends RbacForbiddenException {
  constructor(required: string[]) {
    super(`Missing permissions: [${required.join(', ')}]`);
    this.name = 'InsufficientPermissionsException';
  }
}
