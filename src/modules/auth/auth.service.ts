import { generateAccessToken } from "../../toolbox/generateAccessToken";

import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserDTO, UserModelType } from "../users/interfaces";
import { ErrorNotAuthorized, ErrorNotFound } from "../../constants/interfaces";

export default class AuthService {
  constructor(private model: UserModelType) {}

  async signup(userDto: UserDTO): Promise<void> {
    try {
      userDto.Password = await bcrypt.hash(userDto.Password, 10);
      await this.model.create(userDto);
    } catch (error) {
      console.log("AuthService signup: ", error);
      throw error;
    }
  }

  async findUser(Email: string, Password: string): Promise<UserDTO> {
    try {
      let user = await this.model.findOne({ Email });
      if (!user) throw new ErrorNotFound(`User with email '${Email}' doesn't exist`);
      if (!(await bcrypt.compare(Password, user.Password))) {
        throw new ErrorNotAuthorized("Either email or password is incorrect");
      }
      return user?.toJSON();
    } catch (error) {
      console.log("UsersService: findUser", error);
      throw error;
    }
  }

  async signIn(
    userDto: UserDTO
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      await this.findUser(userDto.Email, userDto.Password);

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
