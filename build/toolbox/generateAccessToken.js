import jwt from "jsonwebtoken";
export function generateAccessToken(userDto) {
    const accessToken = jwt.sign({ email: userDto.Email }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: "10m" });
    return accessToken;
}
