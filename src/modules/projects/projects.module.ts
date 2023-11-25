import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), ProjectsToUsersModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule {}
