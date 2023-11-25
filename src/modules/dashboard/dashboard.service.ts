import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectEntity } from '../../entities/project.entity';
import { NoticesService } from '../notices/notices.service';
import { NoticeEntity } from '../../entities/notice.entity';

@Injectable()
export class DashboardService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly noticesService: NoticesService,
  ) {}

  async getNotices(
    id: string,
    query: Record<string, any>,
  ): Promise<{ data: NoticeEntity[]; length: number }> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.limit = 10;
      query.skip = 0;
      console.log(err);
    }

    return this.noticesService.find({
      take: query.limit,
      skip: query.skip,
      where: { user: { id } },
    });
  }

  async getProjects(
    id: string,
    query: Record<string, any>,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.limit = 10;
      query.skip = 0;
      console.log(err);
    }

    return await this.projectsService.find({
      take: query.limit,
      skip: query.skip,
      where: [
        {
          projectToUsers: [
            { user: { id }, isOwner: true },
            { user: { id }, status: 'userJoined' },
          ],
        },
      ],
      select: [
        'id',
        'title',
        'budget',
        'createdAt',
        'updatedAt',
        'projectToUsers',
      ],
      relations: ['projectToUsers', 'projectToUsers.user'],
    });
  }

  async getResponsesOffers(
    id: string,
    query: Record<string, any>,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.limit = 10;
      query.skip = 0;
      console.log(err);
    }
    return await this.projectsService.find({
      take: query.limit,
      skip: query.skip,
      where: {
        projectToUsers: [
          { user: { id }, status: 'userRequested' },
          { user: { id }, status: 'userInvited' },
        ],
      },
      select: ['id', 'title', 'budget', 'createdAt', 'updatedAt'],
    });
  }
}
