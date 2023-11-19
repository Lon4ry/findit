import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { AuthenticationGuard } from '../auth/authentication.guard';

@UseGuards(AuthenticationGuard)
@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('is-authorized')
  async isAuthorized(): Promise<boolean> {
    return true;
  }

  @Get('subscription')
  async subscription(@User() user: UserEntity) {
    return user.subscription;
  }

  @Get('notices')
  async notices() {}

  @Get('projects')
  async projects(
    @User() user: UserEntity,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    return await this.projectsService.find({
      where: { projectToUsers: { user: { id: user.id }, isOwner: true } } && {
        projectToUsers: { user: { id: user.id }, status: 'userJoined' },
      },
    });
  }

  @Get('responses-offers')
  async responsesOffers(
    @User() user: UserEntity,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    return await this.projectsService.find({
      where: {
        projectToUsers: {
          user: { id: user.id },
          status: 'userInvited' || 'userRequested',
        },
      },
    });
  }
}
