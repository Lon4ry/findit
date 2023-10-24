import { User } from '../../entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
