import { IInvite } from '../interfaces/invites.interface';

export interface IInvitesRepository {
  create(data: any): Promise<IInvite>;
  findByToken(token: string): Promise<IInvite | null>;
  findByTenant(tenantId: string): Promise<IInvite[]>;
  findById(id: string): Promise<IInvite | null>;
  markAsAccepted(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
}
