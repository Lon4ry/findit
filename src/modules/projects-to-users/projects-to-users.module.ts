import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsToUsersEntity } from '../../entities/projects-to-users.entity';
import { ProjectsToUsersService } from './projects-to-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectsToUsersEntity])],
  providers: [ProjectsToUsersService],
  exports: [ProjectsToUsersService],
})
export class ProjectsToUsersModule {}
