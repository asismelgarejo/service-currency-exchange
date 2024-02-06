import httpStatus from "http-status-codes";
import { Response } from "express";
import { getError } from "./getError.js";

export function ValidatePayload(getErrors: (data: any) => any) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response) {
      try {
        const errors = getErrors(req.body);
        if (errors.length > 0) {
          return res.status(httpStatus.BAD_REQUEST).json({ errors });
        }
        return originalMethod.call(this, req, res);
      } catch (err) {
        const { status, message } = getError(err);
        return res.status(status).json({ message });
      }
    };

    return descriptor;
  };
}
