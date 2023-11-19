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

  @Column()
  isOwner: boolean;

  @Column()
  status: 'userInvited' | 'userRequested' | 'userJoined';

  @Column('simple-array')
  permissions: string[];

  @ManyToOne(() => UserEntity, (e) => e.userToProjects)
  user: UserEntity;

  @ManyToOne(() => ProjectEntity, (e) => e.projectToUsers)
  project: ProjectEntity;
}
