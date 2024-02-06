import { NextFunction, Request, Response } from "express";

export type HttpResponse<T> = {
  data?: T;
  status?: number;
  message?: string;
};

export type Middlewares = Record<
  string,
  (req: Request, res: Response, next: NextFunction) => void
>;
