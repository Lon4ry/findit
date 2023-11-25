import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { NoticeEntity } from '../../entities/notice.entity';
import { CreateNoticeDto } from '../../DTOs/notice/create-notice.dto';

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
  ): Promise<{ data: NoticeEntity[]; length: number }> {
    try {
      const [data, length] = await this.noticesRepository.findAndCount(options);
      return {
        data: data,
        length: length,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
