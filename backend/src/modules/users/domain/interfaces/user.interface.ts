/* interfaces and enums*/
import { UserRole } from '../enums/roles.enum';
import { UserStatus } from '../enums/status.enum';

export interface IUserAddress {
  street?: string;
  number?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  tenantId: string;
  role?: UserRole | string;
  status: UserStatus;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiresAt?: Date;
  passwordResetToken?: string | null;
  passwordResetExpiresAt?: Date | null;
  lastPasswordChangedAt?: Date | null;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  address?: IUserAddress;
  createdBy?: string | null;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  refreshTokenHash?: string | null;
}

export interface IUserPayload {
  name: string;
  email: string;
  username: string;
  password?: string;
  tenantId?: string;
  role?: UserRole | string;
  address?: IUserAddress;
  status?: UserStatus;
  isEmailVerified?: boolean;
  failedLoginAttempts?: number;
  createdBy?: string;
  deletedAt?: Date | null;
}
