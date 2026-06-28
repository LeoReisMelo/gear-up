import { UserRole } from '@modules/users/domain/enums/roles.enum';

export interface IJwtPayload {
  sub: string;
  tenantId: string;
  role?: UserRole | string;
  sessionId: string;
}
