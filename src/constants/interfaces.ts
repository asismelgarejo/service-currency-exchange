import { NextFunction, Request, Response } from "express";

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
