import ExchangeRequestsService from "./exchange-requests.service";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { Middlewares } from "../../constants/interfaces";
import { ExchangeRequestsDTO, ValidateExchangeRequestDTO } from "./interfaces";
import { ValidatePayload } from "../../toolbox/ValidatePayload";

export default class ProductController {
  constructor(
    private exchangeRequestsService: ExchangeRequestsService,
    private middlewares: Middlewares
  ) {}

  Init(): Router {
    const router = Router();
    router.get(
      "/",
      this.middlewares.authenticateToken,
      this.getExchanges.bind(this)
    );
    router.post(
      "/",
      this.middlewares.authenticateToken,
      this.requestExchange.bind(this)
    );
    return router;
  }

  async getExchanges(req: Request, res: Response) {
    try {
      const data = await this.exchangeRequestsService.getExchanges();
      res.status(httpStatus.OK).json({ data });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
  @ValidatePayload(ValidateExchangeRequestDTO)
  async requestExchange(req: Request, res: Response) {
    console.log((req as unknown as any)!.user);
    const payload = req.body as unknown as ExchangeRequestsDTO;

    try {
      await this.exchangeRequestsService.requestExchange(
        payload,
        (req as unknown as any)!.user._id
      );
      res.status(httpStatus.CREATED).json({ message: "success" });
    } catch (err) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
}
