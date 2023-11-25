import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { ProjectsModule } from '../projects/projects.module';
import { DashboardService } from './dashboard.service';
import { NoticesModule } from '../notices/notices.module';

@Module({
  imports: [ProjectsModule, NoticesModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
