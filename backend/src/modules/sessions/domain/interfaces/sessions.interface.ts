export interface ISession {
  id?: string;
  userId: string;
  tenantId: string;
  sessionId: string;
  refreshTokenHash?: string;
  userAgent?: string;
  ip?: string;
  device?: string;
  location?: string;
  isActive: boolean;
  lastActiveAt: Date;
  expiresAt?: Date;
  revokedAt?: Date | null;
  revokedReason?: string;
  ipChanged?: boolean;
  suspicious?: boolean;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISessionPayload {
  userId: string;
  tenantId: string;
  sessionId: string;
  isActive: boolean;
  lastActiveAt: Date;
  refreshTokenHash?: string;
  userAgent?: string;
  ip?: string;
  device?: string;
  location?: string;
  expiresAt?: Date;
  createdBy?: string | null;
}
