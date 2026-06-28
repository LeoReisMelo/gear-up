import { UserRole } from '@modules/users/domain/enums/roles.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RbacService {
  hasRole(userRole: UserRole | string, requiredRoles: string[]): boolean {
    return requiredRoles.includes(userRole);
  }

  hasPermissions(
    userPermissions: Set<string>,
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.every((p) => userPermissions.has(p));
  }
}
