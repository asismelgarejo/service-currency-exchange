import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { generateAccessToken } from "../../toolbox/generateAccessToken.js";
import { ErrorNotAuthorized, ErrorNotFound } from "../../constants/interfaces.js";
export default class AuthService {
    model;
    constructor(model) {
        this.model = model;
    }
    async signup(userDto) {
        try {
            userDto.Password = await bcrypt.hash(userDto.Password, 10);
            await this.model.create(userDto);
        }
        catch (error) {
            console.log("AuthService signup: ", error);
            throw error;
        }
    }
    async findUser(Email, Password) {
        try {
            let user = await this.model.findOne({ Email });
            if (!user)
                throw new ErrorNotFound(`User with email '${Email}' doesn't exist`);
            if (!(await bcrypt.compare(Password, user.Password))) {
                throw new ErrorNotAuthorized("Either email or password is incorrect");
            }
            return user?.toJSON();
        }
        catch (error) {
            console.log("UsersService: findUser", error);
            throw error;
        }
    }
    async signIn(userDto) {
        try {
            await this.findUser(userDto.Email, userDto.Password);
            const accessToken = generateAccessToken(userDto);
            const refreshToken = jwt.sign({ user: userDto.Email }, process.env.REFRESH_TOKEN_SECRET || "");
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log("AuthService: ", error);
            throw error;
        }
    }
    async refreshToken(token) {
        try {
            const response = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
            const accessToken = generateAccessToken(response);
            return { accessToken };
        }
        catch (error) {
            console.log("AuthService refreshToken: ", error);
            throw error;
        }
    }
    async logout(token) {
        try {
            const response = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "");
            const accessToken = generateAccessToken(response);
            return { accessToken };
        }
        catch (error) {
            console.log("AuthService refreshToken: ", error);
            throw error;
        }
    }
}
