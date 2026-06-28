/* lib */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* interfaces */
import { IRole } from '@modules/roles/domain/interfaces/roles.interface';
import { IPlan } from '@modules/plans/domain/interfaces/plans.interface';
import { IPlanRepository } from '@modules/plans/domain/repositories/plans.repository';

@Injectable()
export class PlansRepository implements IPlanRepository {
  constructor(
    @InjectModel('Plan')
    private readonly planModel: Model<IPlan>,
  ) {}

  async create(role: Partial<IRole>): Promise<IPlan> {
    return this.planModel.create(role);
  }

  async update(id: string, role: Partial<IRole>): Promise<IPlan | null> {
    return this.planModel.findByIdAndUpdate({ _id: id }, role, {
      returnDocument: 'after',
    });
  }

  async delete(id: string): Promise<void> {
    await this.planModel.findByIdAndDelete({ _id: id });
  }

  async findById(id: string): Promise<IPlan | null> {
    return this.planModel.findById({ _id: id }).exec();
  }

  async findByName(name: string): Promise<IPlan | null> {
    return this.planModel
      .findOne({
        name,
      })
      .exec();
  }
}
