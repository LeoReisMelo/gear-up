import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class PermissionCacheService {
  constructor(private readonly redis: Redis) {}

  async get(key: string) {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl = 60) {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  async deleteByPattern(pattern: string): Promise<void> {
    const stream = this.redis.scanStream({
      match: pattern,
      count: 100,
    });

    const keys: string[] = [];

    stream.on('data', (resultKeys: string[]) => {
      keys.push(...resultKeys);
    });

    await new Promise<void>((resolve) => {
      stream.on('end', () => resolve());
    });

    if (keys.length > 0) {
      await this.redis.del(keys);
    }
  }
}
