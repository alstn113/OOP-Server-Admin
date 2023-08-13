import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.verifyToken(token);
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['access_token'];
  }

  private async verifyToken(token: string) {
    const decoded: { sub: string; username: string } =
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
      });

    return decoded;
  }
}
