import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthSerializer } from './auth.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [UsersModule, ProfilesModule],
  providers: [
    AuthService,
    AuthSerializer,
    // TODO: Apple auth strategy
    // AppleStrategy,
    GoogleStrategy,
    YandexStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
