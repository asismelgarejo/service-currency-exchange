import ExchangeRequestsService from "./exchange-requests.service";
import { Response, Router, Request } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { Middlewares } from "../../constants/interfaces.js";
import { ExchangeRequestsDTO, ValidateExchangeRequestDTO } from "./interfaces/index.js";
import { ValidatePayload } from "../../toolbox/ValidatePayload.js";
import { getError } from "../../toolbox/getError.js";

export default class ProductController {
  constructor(private exchangeRequestsService: ExchangeRequestsService, private middlewares: Middlewares) {}

  Init(): Router {
    const router = Router();
    router.get("/", this.middlewares.authenticateToken, this.getExchanges.bind(this));
    router.post("/", this.middlewares.authenticateToken, this.requestExchange.bind(this));
    router.get("/:id", this.middlewares.authenticateToken, this.getExchange.bind(this));
    router.delete("/:id", this.middlewares.authenticateToken, this.deleteExchange.bind(this));
    return router;
  }

  async getExchanges(req: Request, res: Response) {
    try {
      const data = await this.exchangeRequestsService.getExchanges((req as unknown as any)!.user._id);
      res.status(httpStatus.OK).json({ data });
    } catch (err) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    }
  }
  @ValidatePayload(ValidateExchangeRequestDTO)
  async requestExchange(req: Request, res: Response) {
    const payload = req.body as unknown as ExchangeRequestsDTO;
    try {
      await this.exchangeRequestsService.requestExchange(payload, (req as unknown as any)!.user._id);
      res.status(httpStatus.CREATED).json({ message: "success" });
    } catch (err) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
  async getExchange(req: Request, res: Response) {
    const userId = (req as unknown as any)!.user._id;
    const exchangeId = req.params.id;

    try {
      const data = await this.exchangeRequestsService.getExchange(exchangeId, userId);
      res.status(httpStatus.OK).json({ data });
    } catch (err) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
  async deleteExchange(req: Request, res: Response) {
    const userId = (req as unknown as any)!.user._id;
    const exchangeId = req.params.id;

    try {
      await this.exchangeRequestsService.deleteExchange(exchangeId, userId);
      res.status(httpStatus.OK).json({ message: "success" });
    } catch (err) {
      const { status, message } = getError(err);
      res.status(status).json({ message: message });
    }
  }
}
