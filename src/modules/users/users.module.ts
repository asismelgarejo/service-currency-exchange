import mongoose from "mongoose";
import { BootstrapSchema, UserSchema } from "./schema";
import UsersController from "./users.controller";
import UsersService from "./users.service";
import { Router } from "express";

export default class UsersModule {
  constructor() {}

  static async Init(dbClient: typeof mongoose, router: Router) {
    const userModel = BootstrapSchema(dbClient, UserSchema);
    const usersService = new UsersService(userModel);
    const usersController = new UsersController(usersService);
    const subRoutes = usersController.Init();
    router.use("/users", subRoutes);
    return { UserSchema, usersService };
  }
}
