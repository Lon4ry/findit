import env from '../../shared/const';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from '../configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServeStaticConfigAsync } from '../configs/serve-static.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: true }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    UsersModule,
    ProfilesModule,
    ProjectsModule,
    AuthModule,
    ServeStaticModule.forRootAsync(ServeStaticConfigAsync),
    RenderModule.forRootAsync(Next({ dev: env.is_dev }), {
      viewsDir: null,
      dev: env.is_dev,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
