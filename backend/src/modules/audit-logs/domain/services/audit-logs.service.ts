import { FindAuditLogByIdUseCase } from '@modules/audit-logs/application/use-cases/find-audit-log-by.-d.use-case';
import { FindAuditLogsUseCase } from '@modules/audit-logs/application/use-cases/find-audit-logs.use-case';
import { AuditRepository } from '@modules/audit-logs/infra/repositories/audit-logs.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
  constructor(
    @Inject(AuditRepository)
    private readonly auditRepository: AuditRepository,
  ) {}

  async findAll(currentUser: any) {
    const useCase = new FindAuditLogsUseCase(this.auditRepository);

    return useCase.execute(currentUser);
  }

  async findById(currentUser: any, id: string) {
    const useCase = new FindAuditLogByIdUseCase(this.auditRepository);

    return useCase.execute(currentUser, id);
  }
}
