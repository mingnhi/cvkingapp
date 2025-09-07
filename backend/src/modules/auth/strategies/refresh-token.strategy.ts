import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: any) {
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Token không phải là refresh token');
    }
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Người dùng không hợp lệ');
    }
    return user;
  }
}
