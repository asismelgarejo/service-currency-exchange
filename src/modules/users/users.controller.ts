import UsersService from "./users.service";
import { Router } from "express";
export default class ProductController {
  constructor(private usersService: UsersService) {}

  Init(): Router {
    const router = Router();
    return router;
  }
}
