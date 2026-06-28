/* lib */
import { Schema } from 'mongoose';

/* interfaces and enums */
import { GearPlan } from '@modules/tenant/domain/enums/gear-up-plan.enum';
import { TenantStatus } from '@modules/tenant/domain/enums/tenant-status.enum';
import { SubscriptionStatus } from '@modules/tenant/domain/enums/subscription-status.enum';

const collectionTenants = 'tenants';

const tenantTransform = (_doc: any, ret: any) => {
  ret.id = ret._id?.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};

export const tenantSchemaOptions = {
  collection: collectionTenants,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: tenantTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: tenantTransform,
  },
};

export const TenantSchema = new Schema(
  {
    name: { type: String, required: true },
    document: { type: String },
    ownerUserId: { type: String, required: false, index: true },
    status: {
      type: String,
      enum: Object.values(TenantStatus),
      default: TenantStatus.ACTIVE,
    },
    subscription: {
      plan: {
        type: String,
        enum: Object.values(GearPlan),
        default: GearPlan.FREE,
      },
      status: {
        type: String,
        enum: Object.values(SubscriptionStatus),
        default: SubscriptionStatus.ACTIVE,
      },
      startedAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, default: null },
      trialEndsAt: { type: Date, default: null },
      canceledAt: { type: Date, default: null },
    },
    settings: {
      timezone: { type: String, default: 'America/Sao_Paulo' },
      currency: { type: String, default: 'BRL' },
    },
    deletedAt: { type: Date, default: null },
  },
  tenantSchemaOptions,
);
