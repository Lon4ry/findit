import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Project } from './project.entity';

@Entity({ name: 'projects-to-profiles' })
export class ProjectsToProfiles extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  roles: string[];

  @ManyToOne(() => Profile, (e) => e.profileToProjects)
  profile: Profile;

  @ManyToOne(() => Project, (e) => e.projectToProfiles)
  project: Project;
}
