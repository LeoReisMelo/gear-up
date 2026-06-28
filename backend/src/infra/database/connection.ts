import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseConnection {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  getConnection(): Connection {
    return this.connection;
  }

  getDbName(): string {
    return this.connection.name;
  }
}
