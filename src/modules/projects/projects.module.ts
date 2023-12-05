import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), ProjectsToUsersModule],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
