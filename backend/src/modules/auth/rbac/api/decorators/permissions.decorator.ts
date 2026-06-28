import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '@modules/users/domain/enums/permissions.enum';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (...permissions: UserPermission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
