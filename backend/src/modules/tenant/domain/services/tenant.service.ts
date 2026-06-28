/* libs */
import { Inject, Injectable } from '@nestjs/common';

/* use cases */
import { CreateTenantUseCase } from '@modules/tenant/application/use-cases/create-tenant.use-case';
import { FindAllTenantUseCase } from '@modules/tenant/application/use-cases/find-all-tenant.use-case';
import { FindTenantByIdUseCase } from '@modules/tenant/application/use-cases/find-tenant-by-id.use-case';
import { FindTenantByOwnerUseCase } from '@modules/tenant/application/use-cases/find-tenant-by-owner-id.use-case';
import { UpdateTenantUseCase } from '@modules/tenant/application/use-cases/update-tenant.use-case';
import { DeleteTenantUseCase } from '@modules/tenant/application/use-cases/delete-tenant.use-case';

/* repositories */
import { TenantRepository } from '@modules/tenant/infra/repositories/tenant.repository';

/* interfaces and enums */
import { ITenant } from '../interfaces/tenant.interface';
import { SubscriptionStatus } from '../enums/subscription-status.enum';

/* dto */
import { CreateTenantDto } from '@modules/tenant/api/dto/create-tenant.dto';
import { UpdateTenantDto } from '@modules/tenant/api/dto/update-tenant.dto';
import { UpdateTenantSettingsDto } from '@modules/tenant/api/dto/update-tenant-settings.dto';
import { UpdateTenantSubscriptionDto } from '@modules/tenant/api/dto/update-tenant-subscription.dto';

@Injectable()
export class TenantService {
  constructor(
    @Inject(TenantRepository)
    private readonly tenantRepository: TenantRepository,
  ) {}

  async findAll(): Promise<ITenant[]> {
    const useCase = new FindAllTenantUseCase(this.tenantRepository);

    return useCase.execute();
  }

  async findById(id: string) {
    const useCase = new FindTenantByIdUseCase(this.tenantRepository);

    return useCase.execute(id);
  }

  async findByOwner(ownerUserId: string) {
    const useCase = new FindTenantByOwnerUseCase(this.tenantRepository);

    return useCase.execute(ownerUserId);
  }

  async findSubscription(tenantId: string) {
    const useCase = new FindTenantByIdUseCase(this.tenantRepository);

    const tenant = await useCase.execute(tenantId);

    return {
      plan: tenant?.subscription.plan,
      status: tenant?.subscription.status,
      expiresAt: tenant?.subscription.expiresAt,
      trialEndsAt: tenant?.subscription.trialEndsAt,
      isActive: tenant?.subscription.status === SubscriptionStatus.ACTIVE,
    };
  }

  async create(data: CreateTenantDto) {
    const useCase = new CreateTenantUseCase(this.tenantRepository);

    return useCase.execute(data);
  }

  async createForUser(ownerUserId: string, name: string) {
    const useCase = new CreateTenantUseCase(this.tenantRepository);

    return useCase.execute({
      ownerUserId,
      name,
    });
  }

  async update(id: string, data: UpdateTenantDto) {
    const useCase = new UpdateTenantUseCase(this.tenantRepository);

    return useCase.execute(id, data as any);
  }

  async updateSettings(id: string, settings: UpdateTenantSettingsDto) {
    const useCase = new UpdateTenantUseCase(this.tenantRepository);

    return useCase.execute(id, {
      settings,
    } as any);
  }

  async updateSubscription(
    id: string,
    subscription: UpdateTenantSubscriptionDto,
  ) {
    const useCase = new UpdateTenantUseCase(this.tenantRepository);

    return useCase.execute(id, {
      subscription,
    } as any);
  }

  async delete(id: string) {
    const useCase = new DeleteTenantUseCase(this.tenantRepository);

    return useCase.execute(id);
  }
}
