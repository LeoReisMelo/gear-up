import { SetMetadata } from '@nestjs/common';
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';

export const PLAN_KEY = 'plan';

export const Plan = (...plans: GearPlan[]) => SetMetadata(PLAN_KEY, plans);
