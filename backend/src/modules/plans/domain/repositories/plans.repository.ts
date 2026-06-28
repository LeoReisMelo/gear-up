import { IPlan } from '../interfaces/plans.interface';

export interface IPlanRepository {
  findById(id: string): Promise<IPlan | null>;
  findByName(name: string): Promise<IPlan | null>;
  create(role: Partial<IPlan>): Promise<IPlan>;
  update(id: string, role: Partial<IPlan>): Promise<IPlan | null>;
  delete(id: string): Promise<void>;
}
