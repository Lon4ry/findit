import { Controller, Get } from '@nestjs/common';
import { User } from '../../decorators/http/user.decorator';
import { ProjectEntity } from '../../entities/project.entity';
import { UserEntity } from '../../entities/user.entity';
import { ProjectsService } from './projects.service';

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
