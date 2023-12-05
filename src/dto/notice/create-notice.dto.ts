import { UserEntity } from '../../entities/user.entity';

export class CreateNoticeDto {
  type: string;
  message: string;
  user: UserEntity;
}
