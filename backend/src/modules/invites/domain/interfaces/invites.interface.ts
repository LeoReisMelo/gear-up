import { StatusInvite } from '../enums/status.enum';

export interface IInvite {
  id?: string;
  email: string;
  tenantId: string;
  role: string;
  token: string;
  status: StatusInvite;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  acceptedAt?: Date | null;
}
