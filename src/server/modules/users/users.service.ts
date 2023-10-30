import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../../DTOs/user/create-user.dto';
import { UpdateUserDto } from '../../DTOs/user/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return await user.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.email = updateUserDto.email;
    return await user.save();
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

  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async findOne(options?: FindOneOptions<User>): Promise<User | null> {
    return await this.usersRepository.findOne(options);
  }

  async findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return await this.usersRepository.find(options);
  }
}
