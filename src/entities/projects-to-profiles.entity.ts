import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'projects-to-profiles' })
export class ProjectsToProfilesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  roles: string[];

  @ManyToOne(() => ProfileEntity, (e) => e.profileToProjects)
  profile: ProfileEntity;

  @ManyToOne(() => ProjectEntity, (e) => e.projectToProfiles)
  project: ProjectEntity;
}
