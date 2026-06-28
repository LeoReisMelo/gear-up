import { UserPermission } from '@modules/users/domain/enums/permissions.enum';
import { UserRole } from '@modules/users/domain/enums/roles.enum';

export const ROLE_PERMISSIONS: Record<UserRole, UserPermission[]> = {
  ADMIN: [
    UserPermission.USERS_READ,
    UserPermission.USERS_WRITE,
    UserPermission.TENANT_READ,
  ],
  MANAGER: [UserPermission.USERS_READ],
  CASHIER: [],
  CUSTOMER: [],
  FINANCIAL: [],
  MECHANIC: [],
  SERVICE_ADVISOR: [],
  STOCK_KEEPER: [],
};
