/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class FindTenantByOwnerUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(id: string) {
    return this.tenantRepository.findByOwnerUserId(id);
  }
}
