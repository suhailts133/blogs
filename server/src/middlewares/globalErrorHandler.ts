import type { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/appError";
import { RESPONSE_CODE } from "../shared/constants/statusCode";

export const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      ...(err.details !== undefined && { details: err.details }),
    });
  }

  return res.status(RESPONSE_CODE.INTERNAL_SERVER_ERROR).json({
    statusCode: RESPONSE_CODE.INTERNAL_SERVER_ERROR,
    success: false,
    message: "Something went wrong on our end.",
  });
};
