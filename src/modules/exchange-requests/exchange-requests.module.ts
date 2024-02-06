import mongoose from "mongoose";
import { BootstrapSchema, ExchangeRequestsSchema } from "./schema";
import ExchangeRequestsController from "./exchange-requests.controller";
import ExchangeRequestsService from "./exchange-requests.service";
import { Router } from "express";
import { Middlewares } from "../../constants/interfaces";

export default class ExchangeRequestsModule {
  constructor() {}

  static async Init(
    dbClient: typeof mongoose,
    router: Router,
    middlewares: Middlewares
  ) {
    const userModel = BootstrapSchema(dbClient, ExchangeRequestsSchema);
    const exchangeRequestsService = new ExchangeRequestsService(userModel);
    const exchangeRequestsController = new ExchangeRequestsController(
      exchangeRequestsService,
      middlewares
    );
    const subRoutes = exchangeRequestsController.Init();
    router.use("/exchanges", subRoutes);
    return { ExchangeRequestsSchema, exchangeRequestsService };
  }
}
