/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class DeleteTenantUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(id: string) {
    return this.tenantRepository.delete(id);
  }
}
