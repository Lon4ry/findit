import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../entities/profile.entity';
import { ProjectsToProfiles } from '../../entities/projects-to-profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, ProjectsToProfiles])],
  providers: [ProfilesService],
  controllers: [],
  exports: [ProfilesService],
})
export class ProfilesModule {}
