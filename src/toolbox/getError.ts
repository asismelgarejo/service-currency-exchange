import httpStatus from "http-status-codes";
import { ErrorNotAuthorized, ErrorNotFound } from "../constants/interfaces.js";

export const getError = (err: any): { status: number; message: string } => {
  switch (true) {
    case err instanceof ErrorNotAuthorized:
      return {
        status: httpStatus.UNAUTHORIZED,
        message: err?.message,
      };
    case err instanceof ErrorNotFound:
      return {
        status: httpStatus.NOT_FOUND,
        message: err?.message,
      };
    default:
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err?.message,
      };
  }
};
