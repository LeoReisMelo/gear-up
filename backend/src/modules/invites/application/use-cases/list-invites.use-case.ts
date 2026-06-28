export class ListInvitesUseCase {
  constructor(private readonly repo: any) {}

  async execute(currentUser: any) {
    return this.repo.findByTenant(currentUser.tenantId);
  }
}
