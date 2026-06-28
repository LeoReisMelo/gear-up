export interface IAuditLog {
  id: string;
  actor: any;
  before: any;
  after: any;
  action: string;
  tenantId?: string;
  createdAt: Date;
}
