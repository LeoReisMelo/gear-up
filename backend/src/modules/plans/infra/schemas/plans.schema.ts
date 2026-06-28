/* lib */
import { Schema } from 'mongoose';

const collectionPlans = 'plans';

const plansTransform = (_doc: any, ret: any) => {
  ret.id = ret._id.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const plansSchemaOptions = {
  collection: collectionPlans,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: plansTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: plansTransform,
  },
};

export const PlansSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
      required: false,
      default: [],
    },
    limits: {
      users: { type: Number, required: false },
      vehicles: { type: Number, required: false },
      apiCalls: { type: Number, required: false },
    },
  },
  plansSchemaOptions,
);
