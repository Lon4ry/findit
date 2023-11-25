import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from '../configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AppGateway } from './app.gateway';
import { DashboardModule } from './dashboard/dashboard.module';
import { NoticesModule } from './notices/notices.module';
import { ProjectsToUsersModule } from './projects-to-users/projects-to-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    AuthModule,
    UsersModule,
    NoticesModule,
    ProjectsModule,
    ProjectsToUsersModule,
    DashboardModule,
  ],
  providers: [AppGateway],
})
export class AppModule {}
