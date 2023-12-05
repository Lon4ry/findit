import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { NoticesModule } from '../notices/notices.module';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    NoticesModule,
    ProjectsToUsersModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
