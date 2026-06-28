/* interfaces and enums */
import { ITenant } from '@modules/tenant/domain/interfaces/tenant.interface';

/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class UpdateTenantUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(id: string, data: Partial<ITenant>) {
    return this.tenantRepository.update(id, data);
  }
}
