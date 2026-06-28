import { AcceptInviteUseCase } from '@modules/invites/application/use-cases/accept.invites.use-case';
import { CancelInviteUseCase } from '@modules/invites/application/use-cases/cancel-invites.use-case';
import { CreateInviteUseCase } from '@modules/invites/application/use-cases/create-invites.use.case';
import { ListInvitesUseCase } from '@modules/invites/application/use-cases/list-invites.use-case';
import { ResendInviteUseCase } from '@modules/invites/application/use-cases/resend-invites.use-case';
import { InvitesRepository } from '@modules/invites/infra/repositories/invites.repository';
import { Injectable, Inject } from '@nestjs/common';

/* use cases */

/* repository */

@Injectable()
export class InvitesService {
  constructor(
    @Inject('InvitesRepository')
    private readonly invitesRepository: InvitesRepository,
  ) {}

  async createInvite(currentUser: any, data: any) {
    const useCase = new CreateInviteUseCase(this.invitesRepository);
    return useCase.execute(currentUser, data);
  }

  async acceptInvite(token: string, data?: any) {
    const useCase = new AcceptInviteUseCase(this.invitesRepository);
    return useCase.execute(token);
  }

  async listInvites(currentUser: any) {
    const useCase = new ListInvitesUseCase(this.invitesRepository);
    return useCase.execute(currentUser);
  }

  async cancelInvite(currentUser: any, inviteId: string) {
    const useCase = new CancelInviteUseCase(this.invitesRepository);
    return useCase.execute(currentUser, inviteId);
  }

  async resendInvite(currentUser: any, inviteId: string) {
    const useCase = new ResendInviteUseCase(this.invitesRepository);
    return useCase.execute(currentUser, inviteId);
  }
}
