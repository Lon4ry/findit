import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateProjectDto } from '../../dto/project/create-project.dto';
import { ProjectEntity } from '../../entities/project.entity';
import { UserEntity } from '../../entities/user.entity';
import { ProjectsToUsersService } from '../projects-to-users/projects-to-users.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
    private readonly projectsToUsersService: ProjectsToUsersService,
  ) {}

  async create(
    user: UserEntity,
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    try {
      const project: ProjectEntity = await this.projectsRepository
        .create(createProjectDto)
        .save();
      await this.projectsToUsersService.create({
        user: user,
        project: project,
        isOwner: true,
        status: 'userJoined',
      });
      return project;
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async find(
    options?: FindManyOptions<ProjectEntity>,
  ): Promise<[ProjectEntity[], number]> {
    try {
      return await this.projectsRepository.findAndCount(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
