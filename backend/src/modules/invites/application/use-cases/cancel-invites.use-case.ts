export class CancelInviteUseCase {
  constructor(private readonly repo: any) {}

  async execute(currentUser: any, inviteId: string) {
    const invite = await this.repo.findById(inviteId);

    if (!invite || invite.tenantId !== currentUser.tenantId) {
      throw new Error('NOT_FOUND');
    }

    return this.repo.cancel(inviteId);
  }
}
