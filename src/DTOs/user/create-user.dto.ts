export class CreateUserDto {
  username: string;
  email: string;
  password: string;

  name: {
    firstName: string;
    lastName: string;
  };

  skills: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  gender: 'Male' | 'Female';
}
