import { IPermission } from '../interfaces/permissions.interface';

export interface IPermissionRepository {
  findById(id: string): Promise<IPermission | null>;
  findByName(name: string): Promise<IPermission | null>;
  list(): Promise<IPermission[]>;
  create(permission: Partial<IPermission>): Promise<IPermission>;
  update(
    id: string,
    permission: Partial<IPermission>,
  ): Promise<IPermission | null>;
  delete(id: string): Promise<void>;
}
