export class CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export class UpdateUserDto {
  username: string;
  password: string;
}

export class UpdateUserProfileDto {
  firstName: string;
  lastName: string;
  address: string
}

export class CreateUserPostDto {
  title: string;
  description: string;
}
