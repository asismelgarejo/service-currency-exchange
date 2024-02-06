var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Router } from "express";
import httpStatus from "http-status-codes";
import { ValidateUserDTO } from "../users/interfaces/index.js";
import { getError } from "../../toolbox/getError.js";
import { ValidatePayload } from "../../toolbox/ValidatePayload.js";
import { ValidateAuthDTO } from "./interfaces/index.js";
export default class ProductController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    Init() {
        const router = Router();
        router.post("/signup", this.signup.bind(this));
        router.post("/sign-in", this.signIn.bind(this));
        router.post("/refresh-token", this.refreshToken.bind(this));
        return router;
    }
    async signup(req, res) {
        const payload = req.body;
        try {
            await this.usersService.signup(payload);
            res.status(httpStatus.CREATED).json({ message: "success" });
        }
        catch (err) {
            const { status, message } = getError(err);
            res.status(status).json({ message: message });
        }
    }
    async signIn(req, res) {
        const payload = req.body;
        try {
            const response = await this.usersService.signIn(payload);
            res.status(httpStatus.OK).json({ data: response });
        }
        catch (err) {
            const { status, message } = getError(err);
            res.status(status).json({ message: message });
        }
    }
    async refreshToken(req, res) {
        const body = req.body;
        try {
            const response = await this.usersService.refreshToken(body.token);
            res.status(httpStatus.OK).json({ data: response });
        }
        catch (err) {
            const { status, message } = getError(err);
            res.status(status).json({ message: message });
        }
    }
}
__decorate([
    ValidatePayload(ValidateUserDTO)
], ProductController.prototype, "signup", null);
__decorate([
    ValidatePayload(ValidateAuthDTO)
], ProductController.prototype, "signIn", null);
