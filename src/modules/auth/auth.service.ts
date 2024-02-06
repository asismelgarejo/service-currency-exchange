import { ACCESS_TOKEN } from "../../constants/app";
import { generateAccessToken } from "../../toolbox/generateAccessToken";

import jwt from "jsonwebtoken";
import { UserDTO, UserModelType } from "../users/interfaces";

export default class AuthService {
  constructor(private model: UserModelType) {}

  async signup(userDto: UserDTO): Promise<void> {
    try {
      await this.model.create(userDto);
    } catch (error) {
      console.log("AuthService: ", error);
      throw error;
    }
  }

  async findUser(Email: string, Password: string): Promise<UserDTO> {
    try {
      const response = await this.model.findOne({ Email, Password });
      if (!response) {
        throw new Error("the user does not exist");
      }
      return response?.toJSON();
    } catch (error) {
      console.log("UsersService: findUser", error);
      throw error;
    }
  }

  async signIn(
    userDto: UserDTO
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const user = await this.findUser(userDto.Email, userDto.Password);

      if (!user) {
        console.log(
          `User with email: ${userDto.Email} and password ${userDto.Password} was not found`
        );
        throw new Error("User not found");
      }

      const accessToken = generateAccessToken(userDto);
      const refreshToken = jwt.sign(
        { user: userDto.Email },
        process.env.REFRESH_TOKEN_SECRET || ""
      );
      return { accessToken, refreshToken };
    } catch (error) {
      console.log("AuthService: ", error);
      throw error;
    }
  }
  async refreshToken(token: string): Promise<{ accessToken: string }> {
    try {
      const response = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET || ""
      );
      const accessToken = generateAccessToken(response as UserDTO);
      return { accessToken };
    } catch (error) {
      console.log("AuthService refreshToken: ", error);
      throw error;
    }
  }
  async logout(token: string): Promise<{ accessToken: string }> {
    try {
      const response = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET || ""
      );
      const accessToken = generateAccessToken(response as UserDTO);
      return { accessToken };
    } catch (error) {
      console.log("AuthService refreshToken: ", error);
      throw error;
    }
  }
}
