import mongoose from "mongoose";
import { Router } from "express";
import { BootstrapSchema, UserSchema } from "./schema/index.js";
import UsersController from "./users.controller.js";
import UsersService from "./users.service.js";

export default class UsersModule {
  constructor() {}

  static async Init(dbClient: typeof mongoose, router: Router) {
    const userModel = BootstrapSchema(dbClient, UserSchema);
    const usersService = new UsersService(userModel);
    const usersController = new UsersController();
    const subRoutes = usersController.Init();
    router.use("/users", subRoutes);
    return { UserSchema, usersService };
  }
}
