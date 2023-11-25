import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../decorators/user.decorator';
import { ProjectEntity } from '../../entities/project.entity';

@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('create-template')
  async createTemplate(@User() user: UserEntity): Promise<ProjectEntity[]> {
    const projects = [];
    for (let i = 0; i < 20; i++) {
      projects.push(
        await this.projectsService.create(user, {
          title: 'New one',
          description: 'Hey there!',
          budget: '200 RUB',
        }),
      );
    }
    return projects as ProjectEntity[];
  }
}
