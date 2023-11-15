import { UserEntity } from '../../entities/user.entity';

export class CreateProfileDto {
  name: {
    firstName: string;
    lastName: string;
  };
  skills: {
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };
  gender: 'Male' | 'Female';
  user: UserEntity;
}
