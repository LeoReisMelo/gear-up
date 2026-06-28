import { StatusInvite } from '@modules/invites/domain/enums/status.enum';
import { IInvite } from '@modules/invites/domain/interfaces/invites.interface';
import { IInvitesRepository } from '@modules/invites/domain/repositories/invite.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* interfaces */

@Injectable()
export class InvitesRepository implements IInvitesRepository {
  constructor(
    @InjectModel('Invite')
    private readonly inviteModel: Model<IInvite>,
  ) {}

  async create(data: Partial<IInvite>): Promise<IInvite> {
    return this.inviteModel.create(data);
  }

  async findByToken(token: string): Promise<IInvite | null> {
    return this.inviteModel.findOne({ token }).exec();
  }

  async findById(id: string): Promise<IInvite | null> {
    return this.inviteModel.findById(id).exec();
  }

  async findByTenant(tenantId: string): Promise<IInvite[]> {
    return this.inviteModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async markAsAccepted(id: string): Promise<void> {
    await this.inviteModel.updateOne(
      { _id: id },
      {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
      },
    );
  }

  async cancel(id: string): Promise<void> {
    await this.inviteModel.updateOne(
      { _id: id },
      {
        status: 'CANCELLED',
      },
    );
  }

  async deleteExpired(): Promise<void> {
    await this.inviteModel.deleteMany({
      expiresAt: { $lt: new Date() },
      status: StatusInvite.PENDING,
    });
  }
}
