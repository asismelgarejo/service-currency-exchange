import { HttpResponse } from "../../constants/interfaces";
import UsersService from "./auth.service";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { UserDTO } from "../users/interfaces";

export default class ProductController {
  constructor(private usersService: UsersService) {}

  Init(): Router {
    const router = Router();
    router.post("/signup", this.signup.bind(this));
    router.post("/sign-in", this.signIn.bind(this));
    router.post("/refresh-token", this.refreshToken.bind(this));
    return router;
  }
  async signup(req: Request, res: Response) {
    const payload = req.body as unknown as UserDTO;
    try {
      const response = await this.usersService.signup(payload);
      res.status(httpStatus.CREATED).json({ data: response });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
  async signIn(req: Request, res: Response) {
    const payload = req.body as unknown as UserDTO;
    try {
      const response = await this.usersService.signIn(payload);
      res.status(httpStatus.OK).json({ data: response });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const body = req.body as unknown as { token: string };
    try {
      const response = await this.usersService.refreshToken(body.token);
      res.status(httpStatus.OK).json({ data: response });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
  async getUsers(req: Request, res: Response) {
    const response: HttpResponse<UserDTO[]> = {};

    res.contentType("application/json");
  }
}
