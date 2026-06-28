import { IAuditLog } from '@modules/audit-logs/domain/interfaces/audit-logs.interface';
import { IAuditRepository } from '@modules/audit-logs/domain/repositories/audit-logs.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuditRepository implements IAuditRepository {
  constructor(
    @InjectModel('AuditLog')
    private readonly model: Model<IAuditLog>,
  ) {}

  create(audit: Partial<IAuditLog>) {
    return this.model.create(audit);
  }

  findAll(tenantId: string) {
    return this.model.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  findById(id: string, tenantId: string) {
    return this.model
      .findOne({
        _id: id,
        tenantId,
      })
      .exec();
  }
}
