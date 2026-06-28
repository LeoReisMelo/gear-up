export interface IPermission {
  id: string;
  name: string;
  description?: string;
  module: string;
  createdAt: Date;
  updatedAt: Date;
}
