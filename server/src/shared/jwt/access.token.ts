import jwt from "jsonwebtoken";
import { env } from "../../config/env.config";
import type { StringValue } from "ms";
import type { JwtData } from "./jwt.types";

export const jwtAccessToken = (payload: JwtData): string => {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRY as StringValue });
};
