import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectToUserDto } from '../../dto/project-to-user/create-project-to-user.dto';
import { ProjectsToUsersEntity } from '../../entities/projects-to-users.entity';

@Injectable()
export class ProjectsToUsersService {
  constructor(
    @InjectRepository(ProjectsToUsersEntity)
    private readonly projectsToUsersRepository: Repository<ProjectsToUsersEntity>,
  ) {}

  async create(
    createProjectToUserDto: CreateProjectToUserDto,
  ): Promise<ProjectsToUsersEntity> {
    try {
      return await this.projectsToUsersRepository
        .create(createProjectToUserDto)
        .save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }
}
