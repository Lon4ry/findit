import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from '../../entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeEntity])],
  providers: [NoticesService],
  exports: [NoticesService],
})
export class NoticesModule {}
