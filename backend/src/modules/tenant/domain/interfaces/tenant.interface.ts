/* interfaces and enums */
import { GearPlan } from '../enums/gear-up-plan.enum';
import { SubscriptionStatus } from '../enums/subscription-status.enum';
import { TenantStatus } from '../enums/tenant-status.enum';

export interface ITenant {
  id: string;
  name: string;
  document?: string;
  ownerUserId?: string;
  status: TenantStatus;
  subscription: {
    plan: GearPlan;
    status: SubscriptionStatus;
    startedAt: Date;
    expiresAt?: Date;
    trialEndsAt?: Date;
    canceledAt?: Date;
  };
  settings: {
    timezone: string;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
