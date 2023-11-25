export class CreateProjectDto {
  title: string;

  description: string;

  employersNeeds?: {
    ProjectManagement: number;
    Backend: number;
    Frontend: number;
    MachineLearning: number;
    DevOps: number;
    QA: number;
  };

  budget: string;
}
