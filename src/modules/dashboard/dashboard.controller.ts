import { Controller, Get, Query } from '@nestjs/common';
import { ProjectEntity } from '../../entities/project.entity';
import { User } from '../../decorators/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('subscription')
  async subscription(
    @User() user: UserEntity,
  ): Promise<{ type: string; expiresIn: Date }> {
    return user.subscription;
  }

  @Get('notices')
  async notices(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<null> {
    return await this.dashboardService.getNotices(user.id, query);
  }

  @Get('projects')
  async projects(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    return await this.dashboardService.getProjects(user.id, query);
  }

  @Get('responses-offers')
  async responsesOffers(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    return await this.dashboardService.getResponsesOffers(user.id, query);
  }
}
