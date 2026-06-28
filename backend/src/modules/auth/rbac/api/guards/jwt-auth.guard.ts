import { JwtAdapter } from '@modules/auth/domain/adapters/jwt.adapter';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(JwtAdapter) private readonly jwt: JwtAdapter) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing token');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      const payload = this.jwt.verify(token);

      request.user = payload;

      return true;
    } catch (error: any) {
      throw new UnauthorizedException(error?.message);
    }
  }
}
