import ExchangeRequestsService from "./exchange-requests.service";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { Middlewares } from "../../constants/interfaces";

export default class ProductController {
  constructor(private exchangeRequestsService: ExchangeRequestsService, private middlewares: Middlewares) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.middlewares.authenticateToken, this.getExchanges.bind(this));
    return router;
  }

  async getExchanges(req: Request, res: Response) {
    try {
      console.log((req as unknown as any)!.user);
      
      const data = await this.exchangeRequestsService.getExchanges();
      res.status(httpStatus.OK).json({ data });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
}
