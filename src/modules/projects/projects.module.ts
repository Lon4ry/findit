import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from '../../entities/project.entity';
import { ProjectsToProfiles } from '../../entities/projects-to-profiles.entity';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectsToProfiles])],
  providers: [ProjectsService],
  controllers: [],
  exports: [ProjectsService],
})
export class ProjectsModule {}
