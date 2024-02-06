import { IsString, IsEmail, IsEnum, IsOptional, validateSync } from "class-validator";

// Define the UserStatus enum
enum UserStatus {
  Active = "Active",
  Suspended = "Suspended",
}

export class UserDTO {
  @IsEmail()
  Email: string;

  @IsString()
  Password: string;

  @IsString()
  FirstName: string;

  @IsString()
  LastName: string;

  @IsOptional()
  @IsEnum(UserStatus)
  Status?: UserStatus;
}
export const ValidateUserDTO = (data: any) => {
  const payload = data as UserDTO;
  const user = new UserDTO();
  user.Email = payload.Email;
  user.Password = payload.Password;
  user.FirstName = payload.FirstName;
  user.LastName = payload.LastName;
  return validateSync(user);
};
