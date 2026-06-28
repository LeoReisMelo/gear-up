/* lib */
import { Schema } from 'mongoose';

/* interfaces and enums */
import { IUser } from '@modules/users/domain/interfaces/user.interface';
import { UserStatus } from '@modules/users/domain/enums/status.enum';

/* shared */
import { ZERO } from '@shared/constants/magic-numbers';

const collectionUsers = 'users';

const userTransform = (_doc: any, ret: any) => {
  ret.id = ret._id?.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const userSchemaOptions = {
  collection: collectionUsers,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: userTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: userTransform,
  },
  omitUndefined: true,
};

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    tenantId: {
      type: String,
      required: true,
      index: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
      select: false,
    },
    emailVerificationExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
    lastLoginIp: {
      type: String,
      default: null,
      required: false,
      select: false,
    },
    lastPasswordChangedAt: {
      type: Date,
      default: null,
    },
    failedLoginAttempts: {
      type: Number,
      default: ZERO,
      select: false,
    },
    lockedUntil: {
      type: Date,
      default: null,
      select: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
      select: false,
    },
    passwordResetExpiresAt: {
      type: Date,
      default: null,
      select: false,
    },
    role: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      number: String,
      city: String,
      state: String,
      zipCode: String,
    },
    createdBy: {
      type: String,
      default: null,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
      required: true,
      index: true,
    },
    refreshTokenHash: {
      type: String,
      default: null,
      required: false,
      select: false,
    },
  },
  userSchemaOptions,
);

export { UserSchema, collectionUsers };
