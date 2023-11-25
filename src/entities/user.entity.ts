import {
  AfterUpdate,
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
import { NoticeEntity } from './notice.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-json', { default: { type: null, expiresIn: null } })
  subscription: { type: string; expiresIn: Date };

  @Column('simple-array', { default: [] })
  history: { action: string; date: Date }[];

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

  @Column('simple-json', {
    default: {
      isLoggedIn: false,
      lastLogin: null,
      history: [],
    },
  })
  authLogs: {
    isLoggedIn: boolean;
    lastLogin: Date;
    history: { ip: string; strategy: string; success: boolean; date: Date }[];
  };

  @OneToMany(() => NoticeEntity, (e) => e.user)
  notices: NoticeEntity;

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

  @AfterUpdate()
  async checkAuthLogs(): Promise<void> {
    if (this.authLogs.history.length > 10) {
      this.authLogs.history = this.authLogs.history.slice(
        this.authLogs.history.length - 10,
      );
    }
  }
}
