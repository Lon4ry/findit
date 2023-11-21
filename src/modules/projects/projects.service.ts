import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
  ) {}

  async find(
    options?: FindManyOptions<ProjectEntity>,
  ): Promise<{ data: ProjectEntity[]; length: number }> {
    try {
      const [data, length] =
        await this.projectsRepository.findAndCount(options);
      return {
        data: data,
        length: length,
      };
    } catch (err) {
      console.log(err);
    }
  }
}
