/* lib */
import { UM } from '@shared/constants/magic-numbers';
import { Schema, Types } from 'mongoose';

const collectionRoles = 'roles';

const roleTransform = (_doc: any, ret: any) => {
  ret.id = ret._id.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const roleSchemaOptions = {
  collection: collectionRoles,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: roleTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: roleTransform,
  },
};

export const RolesSchema = new Schema(
  {
    tenantId: {
      type: Types.ObjectId,
      ref: 'Tenant',
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: Types.ObjectId,
        ref: 'Permission',
      },
    ],
    isDefault: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Number,
      default: UM,
    },
  },
  roleSchemaOptions,
);

RolesSchema.index(
  {
    tenantId: UM,
    name: UM,
  },
  {
    unique: true,
  },
);
