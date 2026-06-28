import { Injectable, Scope } from '@nestjs/common';
import { TenantRepository } from '@modules/tenant/infra/repositories/tenant.repository';
import { ITenant } from '@modules/tenant/domain/interfaces/tenant.interface';

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  private tenant: ITenant | null = null;

  constructor(private readonly tenantRepository: TenantRepository) {}

  async load(tenantId: string) {
    this.tenant = await this.tenantRepository.findById(tenantId);

    return this.tenant;
  }

  getTenant() {
    return this.tenant;
  }
}
