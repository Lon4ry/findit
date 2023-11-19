import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthSerializer } from './auth.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthGateway } from './auth.gateway';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    AuthSerializer,
    AuthGateway,
    LocalStrategy,
    // TODO: Apple auth strategy
    // AppleStrategy,
    GoogleStrategy,
    YandexStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
