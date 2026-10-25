import { env } from "../../config/env.config";
import type { JwtData } from "./jwt.types";
import jwt from "jsonwebtoken";
import { ensureError } from "../errors/ensureError.js";
import type { StringValue } from "ms";

export const jwtRefreshToken = (payload: JwtData): string => {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRY as StringValue });
};

export const refeshTokenVerificaion = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtData;

    return decoded;
  } catch (error) {
    const err = ensureError(error).message;
    console.log("from Refresh token verification: ", err);
  }
};
