var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Router } from "express";
import httpStatus, { ReasonPhrases } from "http-status-codes";
import { ValidateExchangeRequestDTO } from "./interfaces/index.js";
import { ValidatePayload } from "../../toolbox/ValidatePayload.js";
export default class ProductController {
    exchangeRequestsService;
    middlewares;
    constructor(exchangeRequestsService, middlewares) {
        this.exchangeRequestsService = exchangeRequestsService;
        this.middlewares = middlewares;
    }
    Init() {
        const router = Router();
        router.get("/", this.middlewares.authenticateToken, this.getExchanges.bind(this));
        router.post("/", this.middlewares.authenticateToken, this.requestExchange.bind(this));
        return router;
    }
    async getExchanges(req, res) {
        try {
            const data = await this.exchangeRequestsService.getExchanges(req.user._id);
            res.status(httpStatus.OK).json({ data });
        }
        catch (err) {
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
    async requestExchange(req, res) {
        const payload = req.body;
        try {
            await this.exchangeRequestsService.requestExchange(payload, req.user._id);
            res.status(httpStatus.CREATED).json({ message: "success" });
        }
        catch (err) {
            res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
        }
    }
}
__decorate([
    ValidatePayload(ValidateExchangeRequestDTO)
], ProductController.prototype, "requestExchange", null);
