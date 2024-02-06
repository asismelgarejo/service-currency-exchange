import { NextFunction, Request, Response } from "express";
import { ReasonPhrases } from "http-status-codes";

export type HttpResponse<T> = {
  data?: T;
  status?: number;
  message?: string;
};
export type CambioSeguroResponse = {
  error: boolean;
  message: string;
  status: number;
  data: {
    status: boolean;
    _id: string;
    purchase_price: number;
    sale_price: number;
    sale_price_comparative: number;
    purchase_price_paralelo: number;
    sale_price_paralelo: number;
  };
};

export type Middlewares = Record<
  string,
  (req: Request, res: Response, next: NextFunction) => void
>;

export class ErrorNotFound extends Error {
  constructor(message: string) {
    super(`${ReasonPhrases.NOT_FOUND}: ${message}`);
  }
}
export class ErrorNotAuthorized extends Error {
  constructor(message: string) {
    super(`${ReasonPhrases.UNAUTHORIZED}: ${message}`);
  }
}
export class ErrorBadRequest extends Error {
  constructor(message: string) {
    super(`${ReasonPhrases.BAD_REQUEST}: ${message}`);
  }
}
