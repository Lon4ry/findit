import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { ProjectEntity } from '../../entities/project.entity';

@Injectable()
export class DashboardService {
  constructor(private readonly projectsService: ProjectsService) {}

  async getNotices(id: string, query: Record<string, any>): Promise<null> {
    return null;
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
            { user: { id: id }, isOwner: true },
            { user: { id: id }, status: 'userJoined' },
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
      relations: ['projectToUsers'],
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
          { user: { id: id }, status: 'userRequested' },
          { user: { id: id }, status: 'userInvited' },
        ],
      },
      select: [
        'id',
        'title',
        'budget',
        'createdAt',
        'updatedAt',
        'projectToUsers',
      ],
      relations: ['projectToUsers'],
    });
  }
}
