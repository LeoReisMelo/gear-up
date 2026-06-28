import { RbacForbiddenException } from './base.exception';

export class InsufficientRoleException extends RbacForbiddenException {
  constructor(role: string, required: string[]) {
    super(`Insufficient role: '${role}'. Required: [${required.join(', ')}]`);
    this.name = 'InsufficientRoleException';
  }
}
