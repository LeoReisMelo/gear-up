import { IJwtPayload } from '@modules/auth/domain/interfaces/jwt.interface';

export interface IJwtService {
  sign(payload: IJwtPayload & { type?: string }): string;
  verify(token: string): IJwtPayload;
  signRefresh(payload: IJwtPayload): string;
  verifyRefresh(token: string): IJwtPayload;
}
