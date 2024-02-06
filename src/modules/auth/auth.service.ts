import { generateAccessToken } from "../../toolbox/generateAccessToken";

import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserDTO, UserModelType } from "../users/interfaces";

export default class AuthService {
  constructor(private model: UserModelType) {}

  async signup(userDto: UserDTO): Promise<void> {
    try {
      // const salt = await bcrypt.genSalt()
      userDto.Password = await bcrypt.hash(userDto.Password, 10);
      await this.model.create(userDto);
    } catch (error) {
      console.log("AuthService: ", error);
      throw error;
    }
  }

  async findUser(Email: string, Password: string): Promise<UserDTO> {
    try {
      let user = await this.model.findOne({ Email });
      if (!user) throw new Error("email or password is incorrect");
      if (!(await bcrypt.compare(Password, user.Password))) {
        throw new Error("email or incorrect");
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
