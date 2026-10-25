import type { Request, Response, NextFunction } from "express";
import { type ZodType } from "zod";
import { AppError } from "../shared/errors/appError";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { INFRA_MESSAGES } from "../shared/messages/infraMessages";

export const zodValidate = (schema: ZodType) => (req: Request, _res: Response, next: NextFunction) => {
  console.log(req.body);
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return next(new AppError(INFRA_MESSAGES.MIDDLEWARES.ZOD_VALIDATION_FAILEED, RESPONSE_CODE.BAD_REQUEST, errors));
  }

  req.body = result.data;
  next();
};
