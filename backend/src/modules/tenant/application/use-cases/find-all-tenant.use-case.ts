/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class FindAllTenantUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute() {
    return this.tenantRepository.findAll();
  }
}
