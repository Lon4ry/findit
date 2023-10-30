import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthSerializer } from './auth.serializer';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
