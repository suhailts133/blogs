import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ensureError } from "../shared/errors/ensureError";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import type { JwtData } from "../shared/jwt/jwt.types";
import { USER_MESSAGES } from "../shared/messages/userMessages";
import { env } from "../config/env.config";

async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];
    if (token === null) {
      return res
        .status(RESPONSE_CODE.UNAUTHORIZED)
        .json({ message: USER_MESSAGES.AUTH.TOKEN_NOT_FOUND, success: false });
    }
    const decoded = jwt.verify(token as string, env.JWT_ACCESS_SECRET as string) as JwtData;

    req.user = decoded;
    next();
  } catch (error) {
    const err = ensureError(error).message;
    console.log(err);
    return res.status(RESPONSE_CODE.UNAUTHORIZED).json({ success: false, message: USER_MESSAGES.AUTH.TOKEN_INVALID });
  }
}

export default authenticate;
