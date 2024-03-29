import mongoose from "mongoose";
import { Router } from "express";
import AuthController from "./auth.controller.js";
import AuthService from "./auth.service.js";
import { BootstrapSchema, UserSchema } from "../users/schema/index.js";

export default class UsersModule {
  constructor() {}

  static async Init(dbClient: typeof mongoose, router: Router) {
    const userModel = BootstrapSchema(dbClient, UserSchema);
    const authService = new AuthService(userModel);
    const authController = new AuthController(authService);
    const subRoutes = authController.Init();
    router.use("/auth", subRoutes);
    return UserSchema;
  }
}
