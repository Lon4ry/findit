import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { OAuthController } from './oauth.controller';

@Module({
  providers: [GoogleStrategy],
  controllers: [AuthController, OAuthController],
})
export class AuthModule {}
