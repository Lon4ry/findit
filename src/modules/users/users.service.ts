import { UserEntity } from '../../entities/user.entity';
import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../../DTOs/user/create-user.dto';
import { hash } from 'bcrypt';
import { ProjectsToUsersEntity } from '../../entities/projects-to-users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.usersRepository
        .create(createUserDto)
        .save();
      delete user.password;
      return user;
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async update(
    id: string,
    key: keyof UserEntity,
    value: never,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.findOne({
      where: { id: id },
      select: ['id', key],
    });

    try {
      if (key !== 'password') user[key] = value;
      else user[key] = await hash(value, 10);
      await user.save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }

    return user;
  }

  async remove(id: string): Promise<string> {
    const user: UserEntity = await this.findOne({
      where: { id: id },
      select: ['id', 'userToProjects'],
    });

    try {
      user.userToProjects.map(
        async (userToProject: ProjectsToUsersEntity): Promise<void> => {
          if (userToProject.isOwner) await userToProject.project.remove();
          await userToProject.remove();
        },
      );
      await user.remove();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }

    if ((await this.findOne({ where: { id: id }, select: ['id'] })) !== null)
      throw new InternalServerErrorException();

    return id;
  }

  async findOne(options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(
    options?: FindManyOptions<UserEntity>,
  ): Promise<{ data: UserEntity[]; length: number }> {
    try {
      const [data, length] = await this.usersRepository.findAndCount(options);
      return {
        data: data,
        length: length,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
