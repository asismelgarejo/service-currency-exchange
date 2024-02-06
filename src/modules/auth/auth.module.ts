import mongoose from "mongoose";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { Router } from "express";
import { BootstrapSchema, UserSchema } from "../users/schema";

export default class UsersModule {
  constructor() {}

  static async Init(dbClient: typeof mongoose, router: Router) {
    BootstrapSchema(dbClient, UserSchema);
    const userModel = BootstrapSchema(dbClient, UserSchema);
    const authService = new AuthService(userModel);
    const authController = new AuthController(authService);
    const subRoutes = authController.Init();
    router.use("/auth", subRoutes);
    return UserSchema;
  }
}
