import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
import UsersService from "../modules/users/users.service.js";

export const authenticateToken = (userService: UsersService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : "";

    if (token === "") {
      res.status(httpStatus.UNAUTHORIZED).json({});
      return;
    }
    try {
      const response = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || ""
      ) as { email: string };

      const user = await userService.findUser(response.email);

      if (!user) {
        console.log("authenticateToken User not found", response.email);
        res.status(httpStatus.FORBIDDEN).json({});
        return;
      }

      (req as unknown as any).user = user;

      next();
    } catch (err) {
      console.log("authenticateToken", err);
      res.status(httpStatus.FORBIDDEN).json({});
      return;
    }
  };
};
