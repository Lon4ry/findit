import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectsToUsersEntity } from './projects-to-users.entity';

@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-json', {
    default: {
      ProjectManagement: 0,
      Backend: 0,
      Frontend: 0,
      MachineLearning: 0,
      DevOps: 0,
      QA: 0,
    },
  })
  employersNeeds: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  @Column({ nullable: true })
  budget: string;

  @OneToMany(() => ProjectsToUsersEntity, (e) => e.project)
  projectToUsers: ProjectsToUsersEntity[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @Column('simple-array')
  history: { action: string; date: Date }[];
}
