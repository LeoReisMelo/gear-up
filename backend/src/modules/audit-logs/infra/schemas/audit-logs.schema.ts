/* lib */
import { Schema } from 'mongoose';

const collectionAuditLogs = 'audit_logs';

const auditLogsTransform = (_doc: any, ret: any) => {
  ret.id = ret._id.toString();

  delete ret._id;
  delete ret.__v;

  return ret;
};

export const auditLogsSchemaOptions = {
  collection: collectionAuditLogs,
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: auditLogsTransform,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: auditLogsTransform,
  },
};

export const AuditLogsSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: false,
    },
    actor: {
      userId: { type: String },
      role: { type: String },
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    entity: {
      type: String,
      id: String,
    },
    before: { type: Object, required: false },
    after: { type: Object, required: false },
    metadata: {
      ip: { type: String },
      userAgent: { type: String },
      source: { type: String },
    },
  },
  auditLogsSchemaOptions,
);
