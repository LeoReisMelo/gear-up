/* interfaces and enums */
import { ITenant } from '../interfaces/tenant.interface';

export interface ITenantRepository {
  create(
    data: Omit<ITenant, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ITenant>;
  findAll(): Promise<ITenant[]>;
  findById(id: string): Promise<ITenant | null>;
  findByOwnerUserId(ownerUserId: string): Promise<ITenant | null>;
  update(id: string, data: Partial<ITenant>): Promise<ITenant | null>;
  delete(id: string): Promise<void>;
}
