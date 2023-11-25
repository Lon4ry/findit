import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'projects-to-users' })
export class ProjectsToUsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isOwner: boolean;

  @Column()
  status:
    | 'userInvited'
    | 'userRequested'
    | 'userJoined'
    | 'userRejected'
    | 'userRemoved';

  @Column('simple-array', { default: [] })
  permissions: string[];

  @ManyToOne(() => UserEntity, (e) => e.userToProjects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (e) => e.projectToUsers)
  project: ProjectEntity;
}
