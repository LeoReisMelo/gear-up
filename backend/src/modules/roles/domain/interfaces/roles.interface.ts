export interface IRole {
  id: string;
  tenantId?: string | null;
  name: string;
  permissions: string[];
  isDefault: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
