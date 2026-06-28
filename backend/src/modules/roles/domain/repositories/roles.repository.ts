import { IRole } from '../interfaces/roles.interface';

export interface IRoleRepository {
  findById(id: string): Promise<IRole | null>;
  findByName(name: string, tenantId?: string): Promise<IRole | null>;
  listByTenant(tenantId: string): Promise<IRole[]>;
  create(role: Partial<IRole>): Promise<IRole>;
  update(id: string, role: Partial<IRole>): Promise<IRole | null>;
  delete(id: string): Promise<void>;
}
