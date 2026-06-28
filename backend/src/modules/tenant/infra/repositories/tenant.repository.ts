/* libs */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* interfaces and enums */
import { ITenant } from '../../domain/interfaces/tenant.interface';

/* repositories */
import { ITenantRepository } from '../../domain/repositories/tenant.repository';

@Injectable()
export class TenantRepository implements ITenantRepository {
  constructor(
    @InjectModel('Tenant')
    private readonly tenantModel: Model<ITenant>,
  ) {}

  async findAll(): Promise<ITenant[]> {
    return this.tenantModel.find().exec();
  }

  async findById(id: string): Promise<ITenant | null> {
    return this.tenantModel.findOne({ _id: id }).exec();
  }

  async findByOwnerUserId(ownerUserId: string): Promise<ITenant | null> {
    return this.tenantModel.findOne({ ownerUserId }).exec();
  }

  async create(
    data: Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ITenant> {
    return this.tenantModel.create(data);
  }

  async update(id: string, data: Partial<ITenant>): Promise<ITenant | null> {
    return this.tenantModel
      .findByIdAndUpdate(id, data, { returnDocument: 'after' })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.tenantModel.findByIdAndUpdate(id, {
      deletedAt: new Date(),
    });
  }
}
