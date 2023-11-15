import { Controller, Get, Query } from '@nestjs/common';
import { ProfileEntity } from '../../entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('api/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async getProfiles(@Query() query: Record<string, string>): Promise<{
    profiles: ProfileEntity[];
    length: number;
  }> {
    return await this.profilesService.findAndCount({
      relations: { user: true },
      skip: query.skip ? Number(query.skip) : 0,
      take: query.take ? Number(query.take) : 0,
      cache: true,
    });
  }
}
