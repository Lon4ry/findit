import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateNoticeDto } from '../../dto/notice/create-notice.dto';
import { NoticeEntity } from '../../entities/notice.entity';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticeEntity)
    private readonly noticesRepository: Repository<NoticeEntity>,
  ) {}

  async create(createNoticeDto: CreateNoticeDto): Promise<NoticeEntity> {
    try {
      return await this.noticesRepository.create(createNoticeDto).save();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }
  }

  async remove(notice: NoticeEntity): Promise<string> {
    try {
      if (notice.removedAt === null) await notice.softRemove();
      else await notice.remove();
    } catch (err) {
      throw new UnprocessableEntityException(err);
    }

    if (
      (notice.removedAt === null &&
        (
          await this.findOne({
            where: { id: notice.id },
            select: ['id', 'removedAt'],
          })
        ).removedAt === null) ||
      (notice.removedAt !== null &&
        (await this.findOne({ where: { id: notice.id }, select: ['id'] })) !==
          null)
    )
      throw new InternalServerErrorException();

    return notice.id;
  }

  async findOne(options?: FindOneOptions<NoticeEntity>): Promise<NoticeEntity> {
    try {
      return await this.noticesRepository.findOne(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async find(
    options?: FindManyOptions<NoticeEntity>,
  ): Promise<[NoticeEntity[], number]> {
    try {
      return await this.noticesRepository.findAndCount(options);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
