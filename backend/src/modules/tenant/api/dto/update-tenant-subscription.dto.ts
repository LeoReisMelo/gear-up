/* libs */
import { IsOptional } from 'class-validator';

/* interfaces and enums */
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';

export class UpdateTenantSubscriptionDto {
  @IsOptional()
  plan?: GearPlan;
}
