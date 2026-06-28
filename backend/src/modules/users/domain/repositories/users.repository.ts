/* interfaces and enums */
import { IUserFilters } from '../interfaces/filters.interface';
import { IUser, IUserPayload } from '../interfaces/user.interface';

export interface IUsersRepository {
  findAll(
    currentUser: { tenantId?: string },
    filters?: IUserFilters,
  ): Promise<IUser[]>;
  findById(
    currentUser: { tenantId?: string },
    id: string,
  ): Promise<IUser | null>;
  findByIdWithPassword(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  create(user: IUserPayload): Promise<IUser>;
  update(
    id: string,
    user: Partial<IUser>,
    tenantId?: string,
  ): Promise<IUser | null>;
  delete(id: string, tenantId: string): Promise<void>;
}
