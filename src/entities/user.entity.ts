import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ProjectsToUsersEntity } from './projects-to-users.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json', { default: { type: null, expiresIn: null } })
  subscription: { type: string; expiresIn: Date };

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column('simple-json', {
    default: { apple: null, google: null, yandex: null, github: null },
  })
  linkedOAuth: {
    apple: unknown;
    google: unknown;
    yandex: unknown;
    github: unknown;
  };

  @Column('simple-json')
  name: {
    firstName: string;
    lastName: string;
  };

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
  skills: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  @Column('simple-json', { default: { github: null } })
  socialLinks: { github: string };

  @Column({ nullable: true })
  photo: string;

  @Column()
  gender: 'Male' | 'Female';

  @Column({ default: '' })
  status: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ default: false })
  isLoggedIn: boolean;

  @OneToMany(() => ProjectsToUsersEntity, (e) => e.project)
  userToProjects: ProjectsToUsersEntity[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ update: false })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  async parseUsername(): Promise<void> {
    this.username = this.username.toLowerCase();
  }
}
