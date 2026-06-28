/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class FindTenantByIdUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(id: string) {
    return this.tenantRepository.findById(id);
  }
}
