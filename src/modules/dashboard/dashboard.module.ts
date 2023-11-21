import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { ProjectsModule } from '../projects/projects.module';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [ProjectsModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
