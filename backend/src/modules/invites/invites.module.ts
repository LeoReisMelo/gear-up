/* lib */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InviteSchema } from './infra/schemas/invites.schema';
import { InviteController } from './api/controllers/invite.controller';
import { InvitesService } from './domain/services/invites.service';
import { InvitesRepository } from './infra/repositories/invites.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Invite',
        schema: InviteSchema,
      },
    ]),
  ],
  controllers: [InviteController],
  providers: [InvitesService, InvitesRepository],
})
export class InvitesModule {}
