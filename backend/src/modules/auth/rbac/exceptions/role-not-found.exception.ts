import { RbacForbiddenException } from './base.exception';

export class RoleNotFoundException extends RbacForbiddenException {
  constructor() {
    super('Role not found for user');
    this.name = 'RoleNotFoundException';
  }
}
