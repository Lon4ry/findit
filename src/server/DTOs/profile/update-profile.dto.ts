export class UpdateProfileDto {
  name: {
    firstName: string;
    lastName: string;
  };

  photo: string;

  gender: null | string;

  status: string;
}
