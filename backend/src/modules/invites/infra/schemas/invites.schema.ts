import { StatusInvite } from '@modules/invites/domain/enums/status.enum';
import { Schema } from 'mongoose';

const collectionInvites = 'invites';

const inviteTransform = (_doc: any, ret: any) => {
  ret.id = ret._id?.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const inviteSchemaOptions = {
  collection: collectionInvites,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: inviteTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: inviteTransform,
  },
  omitUndefined: true,
};

export const InviteSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: StatusInvite,
      default: StatusInvite.PENDING,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    acceptedAt: {
      type: Date,
      default: null,
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
  inviteSchemaOptions,
);
