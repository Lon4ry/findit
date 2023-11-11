import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('api/profiles')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
}
