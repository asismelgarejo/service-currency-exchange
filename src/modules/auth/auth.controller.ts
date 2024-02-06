import { Response, Router, Request } from "express";
import httpStatus from "http-status-codes";
import UsersService from "./auth.service.js";
import { UserDTO, ValidateUserDTO } from "../users/interfaces/index.js";
import { getError } from "../../toolbox/getError.js";
import { ValidatePayload } from "../../toolbox/ValidatePayload.js";
import { ValidateAuthDTO } from "./interfaces/index.js";

export default class ProductController {
  constructor(private usersService: UsersService) {}

  Init(): Router {
    const router = Router();
    router.post("/signup", this.signup.bind(this));
    router.post("/sign-in", this.signIn.bind(this));
    router.post("/refresh-token", this.refreshToken.bind(this));
    return router;
  }
  @ValidatePayload(ValidateUserDTO)
  async signup(req: Request, res: Response) {
    const payload = req.body as unknown as UserDTO;
    try {
      await this.usersService.signup(payload);
      res.status(httpStatus.CREATED).json({ message: "success" });
    } catch (err) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
  @ValidatePayload(ValidateAuthDTO)
  async signIn(req: Request, res: Response) {
    const payload = req.body as unknown as UserDTO;
    try {
      const response = await this.usersService.signIn(payload);
      res.status(httpStatus.OK).json({ data: response });
    } catch (err: any) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
  async refreshToken(req: Request, res: Response) {
    const body = req.body as unknown as { token: string };
    try {
      const response = await this.usersService.refreshToken(body.token);
      res.status(httpStatus.OK).json({ data: response });
    } catch (err) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
}
