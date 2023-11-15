import { UserEntity } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
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
    const user = this.usersRepository.create(createUserDto);
    return await user.save();
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

  async remove(id: string): Promise<'Success' | 'Fail'> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    user.profile.profileToProjects.map(async (e) => {
      if ('owner' in e.roles) await e.project.remove();
      await e.remove();
    });
    await user.profile.remove();
    await user.remove();
    if ((await this.usersRepository.findOne({ where: { id: id } })) === null)
      return 'Success';
    return 'Fail';
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async findOne(
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    return await this.usersRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return await this.usersRepository.find(options);
  }
}
