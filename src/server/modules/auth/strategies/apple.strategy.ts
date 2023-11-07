import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-apple';
import { AuthService } from '../auth.service';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('APPLE_CLIENT_ID'),
      teamID: '',
      callbackURL: configService.get('APPLE_CALLBACK_URL'),
      keyID: '',
      PrivateKeyLocation: '',
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<unknown> {
    return this.authService.oauthValidate(profile);
  }
}
