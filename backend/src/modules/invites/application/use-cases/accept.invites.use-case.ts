export class AcceptInviteUseCase {
  constructor(private readonly repo: any) {}

  async execute(token: string) {
    const invite = await this.repo.findByToken(token);

    if (!invite) {
      throw new Error('INVITE_NOT_FOUND');
    }

    if (invite.status !== 'PENDING') {
      throw new Error('INVITE_ALREADY_USED');
    }

    if (new Date() > invite.expiresAt) {
      throw new Error('INVITE_EXPIRED');
    }

    // 1. criar usuário (chamar UsersService aqui via dependency se quiser)
    // 2. vincular tenant
    // 3. definir role
    // 4. criar sessão

    await this.repo.markAsAccepted(invite.id);

    return {
      message: 'Invite accepted',
    };
  }
}
