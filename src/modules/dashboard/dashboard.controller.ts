import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { User } from '../../decorators/http/user.decorator';
import { NoticeEntity } from '../../entities/notice.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { UserEntity } from '../../entities/user.entity';
import { DashboardService } from './dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('user')
  async user(@User() user: UserEntity): Promise<{
    id: string;
    username: string;
    subscription: { type: string; expiresIn: Date };
  }> {
    return {
      id: user.id,
      username: user.username,
      subscription: user.subscription,
    };
  }

  @Get('notices')
  async notices(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<[NoticeEntity[], number]> {
    return await this.dashboardService.getNotices(user.id, query);
  }

  @Post('notices/:id')
  async noticesActions(
    @Param('id') noticeId: string,
    @Query('action') action: string,
    @User() user: UserEntity,
  ): Promise<string> {
    switch (action) {
      case 'remove':
        return await this.dashboardService.removeNotice(user.id, noticeId);
    }
  }

  @Get('projects')
  async projects(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<[ProjectEntity[], number]> {
    return await this.dashboardService.getProjects(user.id, query);
  }

  @Get('responses-offers')
  async responsesOffers(
    @Query() query: Record<string, any>,
    @User() user: UserEntity,
  ): Promise<[ProjectEntity[], number]> {
    return await this.dashboardService.getResponsesOffers(user.id, query);
  }
}
