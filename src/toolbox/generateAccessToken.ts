import jwt from "jsonwebtoken";
import { UserDTO } from "../modules/users/interfaces/index.js";

export function generateAccessToken(userDto: UserDTO) {
  const accessToken = jwt.sign(
    { email: userDto.Email },
    process.env.ACCESS_TOKEN_SECRET || "",
    { expiresIn: "10m" }
  );
  return accessToken;
}
