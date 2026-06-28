import { IAuditLog } from '../interfaces/audit-logs.interface';

export interface IAuditRepository {
  create(audit: Partial<IAuditLog>): Promise<IAuditLog>;
  findAll(tenantId: string): Promise<IAuditLog[]>;
  findById(id: string, tenantId: string): Promise<IAuditLog | null>;
}
