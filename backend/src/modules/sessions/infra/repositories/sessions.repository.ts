import {
  ISession,
  ISessionPayload,
} from '@modules/sessions/domain/interfaces/sessions.interface';
import { ISessionsRepository } from '@modules/sessions/domain/repositories/sessions.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionsRepository implements ISessionsRepository {
  constructor(
    @InjectModel('Session')
    private readonly sessionModel: Model<ISession>,
  ) {}

  async findByUserId(
    currentUser: { tenantId?: string },
    userId: string,
  ): Promise<ISession[]> {
    const query: any = {
      userId,
    };

    if (currentUser?.tenantId) {
      query.tenantId = currentUser.tenantId;
    }

    return this.sessionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(sessionId: string): Promise<ISession | null> {
    return this.sessionModel.findOne({ sessionId }).exec();
  }

  async create(session: ISessionPayload): Promise<ISession> {
    return this.sessionModel.create(session);
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.sessionModel.updateOne(
      { sessionId },
      {
        isActive: false,
        revokedAt: new Date(),
      },
    );
  }

  async revokeAllByUserId(
    currentUser: { tenantId?: string },
    userId: string,
  ): Promise<void> {
    const query: any = {
      userId,
    };

    if (currentUser?.tenantId) {
      query.tenantId = currentUser.tenantId;
    }

    await this.sessionModel.updateMany(query, {
      isActive: false,
      revokedAt: new Date(),
    });
  }

  async updateLastActivity(sessionId: string): Promise<void> {
    await this.sessionModel.updateOne(
      { sessionId },
      {
        lastActiveAt: new Date(),
      },
    );
  }

  async updateRefreshToken(
    sessionId: string,
    refreshTokenHash: string,
  ): Promise<void> {
    await this.sessionModel.updateOne(
      { sessionId },
      {
        refreshTokenHash,
        lastActiveAt: new Date(),
      },
    );
  }

  async delete(sessionId: string): Promise<void> {
    await this.sessionModel.deleteOne({ sessionId });
  }
}
