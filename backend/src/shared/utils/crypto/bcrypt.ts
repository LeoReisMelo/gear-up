import * as bcrypt from 'bcrypt';
import { DEZ } from '@shared/constants/magic-numbers';
import { Injectable } from '@nestjs/common';
import { IBcryptUtil } from './contracts/bcrypt-util.contract';

const SALT_ROUNDS = DEZ;

@Injectable()
export class BcryptUtil implements IBcryptUtil {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, SALT_ROUNDS);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
