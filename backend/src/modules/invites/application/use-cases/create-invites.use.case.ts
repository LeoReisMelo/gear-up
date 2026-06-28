import { randomUUID } from 'crypto';

export class CreateInviteUseCase {
  constructor(private readonly repo: any) {}

  async execute(currentUser: any, data: any) {
    const token = randomUUID();

    const invite = {
      email: data.email,
      role: data.role,
      tenantId: currentUser.tenantId,
      token,
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    };

    const created = await this.repo.create(invite);

    // aqui normalmente chamaria EmailService
    // await this.emailService.sendInvite(invite.email, token);

    return created;
  }
}
