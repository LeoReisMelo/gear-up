import { ITenant } from '@modules/tenant/domain/interfaces/tenant.interface';

declare global {
  namespace Express {
    interface User {
      sub: string;
      tenantId?: string;
      tenant?: ITenant;
      role?: string;
      email?: string;
    }

    interface Request {
      user: User;
    }
  }
}

export {};
