export class CreateProfileDto {
  name: {
    firstName: string;
    lastName: string;
  };

  gender: null | string;

  userId: string;
}
