/* lib */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* interfaces */
import { IPermissionRepository } from '../../domain/repositories/permissions.repository';
import { IPermission } from '@modules/permissions/domain/interfaces/permissions.interface';

@Injectable()
export class PermissionsRepository implements IPermissionRepository {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<IPermission>,
  ) {}

  async create(permission: Partial<IPermission>): Promise<IPermission> {
    return this.permissionModel.create(permission);
  }

  async update(
    id: string,
    permission: Partial<IPermission>,
  ): Promise<IPermission | null> {
    return this.permissionModel.findByIdAndUpdate(id, permission, {
      returnDocument: 'after',
    });
  }

  async delete(id: string): Promise<void> {
    await this.permissionModel.findByIdAndDelete(id);
  }

  async findById(id: string): Promise<IPermission | null> {
    return this.permissionModel.findById(id).lean();
  }

  async findByName(name: string): Promise<IPermission | null> {
    return this.permissionModel.findOne({ name }).lean();
  }

  async list(): Promise<IPermission[]> {
    return this.permissionModel.find().lean();
  }
}
