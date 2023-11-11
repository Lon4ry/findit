import { Injectable } from '@nestjs/common';
import { Profile } from '../../entities/profile.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from '../../DTOs/profile/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profilesRepository.create(createProfileDto);
    profile.user = createProfileDto.user;
    return await profile.save();
  }

  async findAndCount(
    options?: FindManyOptions,
  ): Promise<{ profiles: Profile[]; length: number }> {
    const [profiles, length] =
      await this.profilesRepository.findAndCount(options);
    return {
      profiles: profiles,
      length: length,
    };
  }
}
