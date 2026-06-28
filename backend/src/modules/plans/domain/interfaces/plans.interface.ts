export interface IPlan {
  id: string;
  name: string;
  value: number;
  description: string;
  features?: string[];
  limit: {
    users?: number;
    vehicles?: number;
    apiCalls?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
