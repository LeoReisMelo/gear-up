/* lib */
import { Schema } from 'mongoose';

const collectionPermissions = 'permissions';

const permissionTransform = (_doc: any, ret: any) => {
  ret.id = ret._id.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const permissionSchemaOptions = {
  collection: collectionPermissions,
  timestamps: true,

  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: permissionTransform,
  },

  toObject: {
    virtuals: true,
    versionKey: false,
    transform: permissionTransform,
  },
};

export const PermissionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    module: {
      type: String,
      required: true,
    },
  },
  permissionSchemaOptions,
);
