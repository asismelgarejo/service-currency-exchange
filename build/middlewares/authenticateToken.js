import httpStatus from "http-status-codes";
import jwt from "jsonwebtoken";
export const authenticateToken = (userService) => {
    return async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader ? authHeader.split(" ")[1] : "";
        if (token === "") {
            res.status(httpStatus.UNAUTHORIZED).json({});
            return;
        }
        try {
            const response = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
            const user = await userService.findUser(response.email);
            if (!user) {
                console.log("authenticateToken User not found", response.email);
                res.status(httpStatus.FORBIDDEN).json({});
                return;
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.log("authenticateToken", err);
            res.status(httpStatus.FORBIDDEN).json({});
            return;
        }
    };
};
