import { ISession, ISessionPayload } from '../interfaces/sessions.interface';

export interface ISessionsRepository {
  findByUserId(
    currentUser: { tenantId?: string },
    userId: string,
  ): Promise<ISession[]>;

  findById(sessionId: string): Promise<ISession | null>;
  create(session: ISessionPayload): Promise<ISession>;
  revokeSession(sessionId: string): Promise<void>;
  revokeAllByUserId(
    currentUser: { tenantId?: string },
    userId: string,
  ): Promise<void>;
  updateLastActivity(sessionId: string): Promise<void>;
  updateRefreshToken(
    sessionId: string,
    refreshTokenHash: string,
  ): Promise<void>;
  delete(sessionId: string): Promise<void>;
}
