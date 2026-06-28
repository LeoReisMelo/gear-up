/* libs */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* repositories */
import { IUsersRepository } from '../../domain/repositories/users.repository';

/* interfaces and enums */
import {
  IUser,
  IUserPayload,
} from '@modules/users/domain/interfaces/user.interface';
import { UserStatus } from '@modules/users/domain/enums/status.enum';
import {
  IUserFilters,
  IUserMongoQuery,
} from '@modules/users/domain/interfaces/filters.interface';

/* shared */
import { sanitizeObject } from '@shared/utils/database/sanitize-object';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<IUser>,
  ) {}

  async findAll(
    currentUser: { tenantId?: string },
    filters?: IUserFilters,
  ): Promise<IUser[]> {
    const { search, ...rest } = filters || {};

    const query: IUserMongoQuery = sanitizeObject<IUserMongoQuery>(rest);

    if (currentUser?.tenantId) {
      query.tenantId = currentUser.tenantId;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
      ];
    }

    return this.userModel.find(query).exec();
  }

  async findById(
    currentUser: { tenantId?: string },
    id: string,
  ): Promise<IUser | null> {
    return this.userModel
      .findOne({
        _id: id,
        ...(currentUser?.tenantId ? { tenantId: currentUser.tenantId } : {}),
      })
      .exec();
  }

  async findByIdWithPassword(id: string): Promise<IUser | null> {
    return this.userModel
      .findOne({
        _id: id,
      })
      .select('+password')
      .exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel
      .findOne({
        email,
      })
      .select('+password')
      .exec();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.userModel
      .findOne({
        username,
      })
      .select('+password')
      .exec();
  }

  async create(user: IUserPayload): Promise<IUser> {
    return this.userModel.create(user);
  }

  async update(
    id: string,
    user: Partial<IUser>,
    tenantId?: string,
  ): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(
      { _id: id, ...(tenantId ? { tenantId } : {}) },
      {
        ...user,
        updatedAt: new Date(),
      },
      { returnDocument: 'after' },
    );
  }

  async delete(id: string, tenantId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      { _id: id, ...(tenantId ? { tenantId } : {}) },
      {
        deletedAt: new Date(),
        status: UserStatus.DELETED,
      },
      { returnDocument: 'after' },
    );
  }
}
