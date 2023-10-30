import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProjectsToProfiles } from './projects-to-profiles.entity';

@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json')
  name: {
    firstName: string;
    lastName: string;
  };

  @Column('simple-json')
  skills: {
    backend: number;
    frontend: number;
    test: number;
  };

  @Column('simple-json', { default: {} })
  links: { github: string };

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ default: '' })
  status: string;

  @Column()
  lastLogin: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToMany(() => ProjectsToProfiles, (e) => e.profile)
  profileToProjects: ProjectsToProfiles[];
}
