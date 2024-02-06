import { IsString, IsEmail, validateSync } from "class-validator";

export class AuthDTO {
  @IsEmail()
  Email: string;

  @IsString()
  Password: string;
}
export const ValidateAuthDTO = (data: any) => {
  const payload = data as AuthDTO;
  const user = new AuthDTO();
  user.Email = payload.Email;
  user.Password = payload.Password;
  return validateSync(user);
};
