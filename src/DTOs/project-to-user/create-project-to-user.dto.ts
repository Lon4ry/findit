import { UserEntity } from '../../entities/user.entity';
import { ProjectEntity } from '../../entities/project.entity';

export class CreateProjectToUserDto {
  isOwner?: boolean;
  permissions?: string[];
  status:
    | 'userInvited'
    | 'userRequested'
    | 'userJoined'
    | 'userRejected'
    | 'userRemoved';
  user: UserEntity;
  project: ProjectEntity;
}
