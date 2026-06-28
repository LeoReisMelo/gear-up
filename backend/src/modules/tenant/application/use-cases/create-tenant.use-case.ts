/* interfaces and enums*/
import { CurrencyEnum } from '@modules/tenant/domain/enums/currency.enum';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';
import { SubscriptionStatus } from '@modules/tenant/domain/enums/subscription-status.enum';
import { TenantStatus } from '@modules/tenant/domain/enums/tenant-status.enum';
import { TimezoneEnum } from '@modules/tenant/domain/enums/timezone.enum';

/* repositories */
import { ITenantRepository } from '@modules/tenant/domain/repositories/tenant.repository';

export class CreateTenantUseCase {
  constructor(private readonly tenantRepository: ITenantRepository) {}

  async execute(data: { name: string; ownerUserId?: string }) {
    return this.tenantRepository.create({
      ...data,
      status: TenantStatus.ACTIVE,
      subscription: {
        plan: GearPlan.FREE,
        status: SubscriptionStatus.ACTIVE,
        startedAt: new Date(),
      },
      settings: {
        timezone: TimezoneEnum.AMERICA_SAO_PAULO,
        currency: CurrencyEnum.BRL,
      },
      deletedAt: null,
    });
  }
}
