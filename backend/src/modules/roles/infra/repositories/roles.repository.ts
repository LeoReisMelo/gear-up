/* lib */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* interfaces */
import { IRoleRepository } from '../../domain/repositories/roles.repository';
import { IRole } from '@modules/roles/domain/interfaces/roles.interface';

@Injectable()
export class RolesRepository implements IRoleRepository {
  constructor(
    @InjectModel('Role')
    private readonly roleModel: Model<IRole>,
  ) {}

  async create(role: Partial<IRole>): Promise<IRole> {
    return this.roleModel.create(role);
  }

  async update(id: string, role: Partial<IRole>): Promise<IRole | null> {
    return this.roleModel.findByIdAndUpdate({ _id: id }, role, {
      returnDocument: 'after',
    });
  }

  async delete(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete({ _id: id });
  }

  async findById(id: string): Promise<IRole | null> {
    return this.roleModel.findById({ _id: id }).populate('permissions').lean();
  }

  async findByName(name: string, tenantId?: string): Promise<IRole | null> {
    return this.roleModel
      .findOne({
        name,
        ...(tenantId ? { tenantId } : {}),
      })
      .populate('permissions')
      .exec();
  }

  async listByTenant(tenantId: string): Promise<IRole[]> {
    return this.roleModel
      .find({
        tenantId,
      })
      .populate('permissions')
      .lean();
  }
}
