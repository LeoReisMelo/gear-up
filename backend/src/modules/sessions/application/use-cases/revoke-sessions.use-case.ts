import { ISessionsRepository } from '../../domain/repositories/sessions.repository';

export class RevokeSessionUseCase {
  constructor(private readonly repo: ISessionsRepository) {}

  async execute(currentUser: any, sessionId: string) {
    const session = await this.repo.findById(sessionId);

    if (!session) {
      throw new Error('SESSION_NOT_FOUND');
    }

    // segurança multi-tenant
    if (currentUser.tenantId && session.tenantId !== currentUser.tenantId) {
      throw new Error('FORBIDDEN_TENANT');
    }

    // usuário só pode revogar própria sessão (exceto admin)
    if (session.userId !== currentUser.userId && !currentUser.isAdmin) {
      throw new Error('FORBIDDEN');
    }

    return this.repo.revokeSession(sessionId);
  }
}
