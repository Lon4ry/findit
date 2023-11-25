import { UserEntity } from '../../entities/user.entity';

export class UpdateUserDto {
  id: string;
  key: keyof UserEntity;
  value: never;
}
