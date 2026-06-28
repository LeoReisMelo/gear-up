import { IAuditRepository } from '@modules/audit-logs/domain/repositories/audit-logs.repository';

export class FindAuditLogByIdUseCase {
  constructor(private readonly repository: IAuditRepository) {}

  async execute(currentUser: any, id: string) {
    return this.repository.findById(id, currentUser.tenantId);
  }
}
