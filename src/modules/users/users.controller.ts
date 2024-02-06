import { HttpResponse } from "../../constants/interfaces";
import UsersService from "./users.service";
import { UserDTO } from "./interfaces";
import { Response, Router, Request } from "express";
export default class ProductController {
  constructor(private usersService: UsersService) {}

  Init(): Router {
    const router = Router();
    return router;
  }

  async getUsers(req: Request, res: Response) {
    const response: HttpResponse<UserDTO[]> = {};

    res.contentType("application/json");
  }
}
