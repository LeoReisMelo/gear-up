/* libs */
import { ForbiddenException } from '@nestjs/common';

export class TenantRequiredForSubordinateUserCreation extends ForbiddenException {
  constructor(
    message = 'Tenant context required for subordinate user creation',
  ) {
    super(message);
    this.name = 'TenantRequiredForSubordinateUserCreation';
  }
}
