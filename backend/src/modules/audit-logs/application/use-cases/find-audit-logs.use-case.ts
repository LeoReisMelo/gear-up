import { IAuditRepository } from '@modules/audit-logs/domain/repositories/audit-logs.repository';

export class FindAuditLogsUseCase {
  constructor(private readonly repository: IAuditRepository) {}

  async execute(currentUser: any) {
    return this.repository.findAll(currentUser.tenantId);
  }
}
