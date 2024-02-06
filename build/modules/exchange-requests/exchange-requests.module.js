import { BootstrapSchema, ExchangeRequestsSchema } from "./schema/index.js";
import ExchangeRequestsController from "./exchange-requests.controller.js";
import ExchangeRequestsService from "./exchange-requests.service.js";
export default class ExchangeRequestsModule {
    constructor() { }
    static async Init(dbClient, router, middlewares) {
        const userModel = BootstrapSchema(dbClient, ExchangeRequestsSchema);
        const exchangeRequestsService = new ExchangeRequestsService(userModel);
        const exchangeRequestsController = new ExchangeRequestsController(exchangeRequestsService, middlewares);
        const subRoutes = exchangeRequestsController.Init();
        router.use("/exchanges", subRoutes);
        return { ExchangeRequestsSchema, exchangeRequestsService };
    }
}
