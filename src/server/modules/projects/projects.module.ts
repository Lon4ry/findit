import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from '../../entities/project.entity';
import { ProjectsToProfiles } from '../../entities/projects-to-profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectsToProfiles])],
  providers: [],
  controllers: [],
  exports: [],
})
export class ProjectsModule {}
