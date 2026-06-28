export class ResendInviteUseCase {
  constructor(private readonly repo: any) {}

  async execute(currentUser: any, inviteId: string) {
    const invite = await this.repo.findById(inviteId);

    if (!invite) {
      throw new Error('NOT_FOUND');
    }

    // reenvia email
    // await emailService.sendInvite(invite.email, invite.token);

    return {
      message: 'Invite resent',
    };
  }
}
