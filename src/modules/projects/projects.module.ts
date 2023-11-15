import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsToProfilesEntity } from '../../entities/projects-to-profiles.entity';
import { ProjectsService } from './projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, ProjectsToProfilesEntity]),
  ],
  providers: [ProjectsService],
  controllers: [],
  exports: [ProjectsService],
})
export class ProjectsModule {}
