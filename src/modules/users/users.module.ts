import { UserEntity } from '../../entities/user.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ProjectsToUsersModule],
  providers: [UsersService, UsersGateway],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
