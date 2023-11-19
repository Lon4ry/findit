import { Controller, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthenticationGuard } from '../auth/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
}
