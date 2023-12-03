import { Injectable, NotFoundException } from '@nestjs/common';
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
  ): Promise<[NoticeEntity[], number]> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.take = 10;
      query.skip = 0;
      console.log(err);
    }

    return this.noticesService.find({
      take: query.take,
      skip: query.skip,
      where: { user: { id } },
      order: { createdAt: 'DESC' },
    });
  }

  async removeNotice(userId: string, noticeId: string): Promise<string> {
    const notice: NoticeEntity = await this.noticesService.findOne({
      where: { id: noticeId, user: { id: userId } },
      select: ['id', 'removedAt'],
      withDeleted: true,
    });

    if (!notice) throw new NotFoundException();

    return await this.noticesService.remove(notice);
  }

  async getProjects(
    id: string,
    query: Record<string, any>,
  ): Promise<[ProjectEntity[], number]> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.take = 10;
      query.skip = 0;
      console.log(err);
    }

    return await this.projectsService.find({
      take: query.take,
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
      order: { updatedAt: 'DESC' },
    });
  }

  async getResponsesOffers(
    id: string,
    query: Record<string, any>,
  ): Promise<[ProjectEntity[], number]> {
    try {
      query = query as Record<string, number>;
    } catch (err) {
      query.take = 10;
      query.skip = 0;
      console.log(err);
    }

    return await this.projectsService.find({
      take: query.take,
      skip: query.skip,
      where: {
        projectToUsers: [
          { user: { id }, status: 'userRequested' },
          { user: { id }, status: 'userInvited' },
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
      relations: ['projectToUsers', 'projectToUsers.user'],
      order: { updatedAt: 'DESC' },
    });
  }
}
