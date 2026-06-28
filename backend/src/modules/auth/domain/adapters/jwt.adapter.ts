import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { IJwtService } from '@modules/auth/application/contracts/jwt.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtAdapter implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: IJwtPayload & { type?: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
  }

  verify(token: string): IJwtPayload {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }

  signRefresh(payload: IJwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
  }

  verifyRefresh(token: string): IJwtPayload {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
