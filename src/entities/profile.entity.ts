import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProjectsToProfilesEntity } from './projects-to-profiles.entity';

@Entity({ name: 'profiles' })
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  name: {
    firstName: string;
    lastName: string;
  };

  @Column('simple-json')
  skills: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  @Column('simple-json', { default: {} })
  links: { github: string };

  @Column({ nullable: true })
  photo: string;

  @Column()
  gender: string;

  @Column({ default: '' })
  status: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => ProjectsToProfilesEntity, (e) => e.profile)
  profileToProjects: ProjectsToProfilesEntity[];
}
