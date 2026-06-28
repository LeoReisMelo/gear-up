/* lib */
import { Schema, Types } from 'mongoose';

/* enums */
import { SubscriptionStatus } from '@modules/tenant/domain/enums/subscription-status.enum';

const collectionSubscriptions = 'subscriptions';

const subscriptionTransform = (_doc: any, ret: any) => {
  ret.id = ret._id?.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const subscriptionSchemaOptions = {
  collection: collectionSubscriptions,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: subscriptionTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: subscriptionTransform,
  },
};

export const SubscriptionSchema = new Schema(
  {
    tenantId: {
      type: Types.ObjectId,
      ref: 'Tenant',
      required: true,
      index: true,
    },

    planId: {
      type: Types.ObjectId,
      ref: 'Plan',
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.ACTIVE,
      required: true,
      index: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    currentPeriodStart: {
      type: Date,
      default: Date.now,
    },

    currentPeriodEnd: {
      type: Date,
      default: null,
    },

    trialEndsAt: {
      type: Date,
      default: null,
    },

    canceledAt: {
      type: Date,
      default: null,
    },

    externalReference: {
      provider: {
        type: String,
        default: null, // stripe, manual, etc
      },
      subscriptionId: {
        type: String,
        default: null,
      },
      customerId: {
        type: String,
        default: null,
      },
    },

    metadata: {
      type: Object,
      default: {},
    },
  },
  subscriptionSchemaOptions,
);
