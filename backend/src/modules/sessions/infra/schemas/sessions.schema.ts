import { Schema } from 'mongoose';

const collectionSessions = 'sessions';

const sessionTransform = (_doc: any, ret: any) => {
  ret.id = ret._id?.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const sessionSchemaOptions = {
  collection: collectionSessions,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: sessionTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: sessionTransform,
  },
  omitUndefined: true,
};

export const SessionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    refreshTokenHash: {
      type: String,
      required: false,
      select: false,
    },
    userAgent: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
      required: false,
    },
    device: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: false,
      index: true,
    },
    revokedAt: {
      type: Date,
      default: null,
      index: true,
    },
    revokedReason: {
      type: String,
      required: false,
    },
    ipChanged: {
      type: Boolean,
      default: false,
    },
    suspicious: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  sessionSchemaOptions,
);
