import { UserStatus } from '../enums/status.enum';
import { IUser } from './user.interface';
import { QueryFilter } from 'mongoose';

export interface IUserFilters {
  search?: string;
  name?: string;
  email?: string;
  username?: string;
  tenantId?: string;
  isEmailVerified?: boolean;
  role?: string;
  status?: UserStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date | null;
  lastPasswordChangedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface IUserMongoQuery extends QueryFilter<IUser> {
  $or?: Array<{
    name?: { $regex: string; $options: 'i' };
    email?: { $regex: string; $options: 'i' };
    username?: { $regex: string; $options: 'i' };
  }>;
}
