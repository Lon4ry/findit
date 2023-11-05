export class UpdateProfileDto {
  name: {
    firstName: string;
    lastName: string;
  };

  photo: string;

  gender: string;

  status: string;
}
