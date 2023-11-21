import { UserEntity } from '../../entities/user.entity';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { UpdateUserDto } from '../../DTOs/user/update-user.dto';
import { CreateUserDto } from '../../DTOs/user/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.create(createUserDto).save();

    delete user.password;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOne({
      where: { id: id },
      select: { password: true },
    });
    user.username = updateUserDto.username;
    user.password = await hash(updateUserDto.password, 10);
    user.email = updateUserDto.email;
    const updatedUser = await user.save();
    console.log(updatedUser, '(UsersService)');
    delete updatedUser.password;

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user: UserEntity = await this.usersRepository.findOne({
      where: { id: id },
      select: ['userToProjects'],
    });
    user.userToProjects.map(async (e) => {
      if (e.isOwner) await e.project.remove();
      await e.remove();
    });
    await user.remove();
    if ((await this.usersRepository.findOne({ where: { id: id } })) !== null)
      throw new InternalServerErrorException();
  }

  async findOne(options?: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.usersRepository.findOne(options);
  }

  async find(
    options?: FindManyOptions<UserEntity>,
  ): Promise<{ data: UserEntity[]; length: number }> {
    const [data, length] = await this.usersRepository.findAndCount(options);
    return {
      data: data,
      length: length,
    };
  }
}
