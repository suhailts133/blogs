import type { IAuthService } from "../interface/user/user.service.interface";
import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import { USER_MESSAGES } from "../shared/messages/userMessages";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { RespsonseHelper } from "../shared/common/responseHelper";
import type { LoginRequestDTO } from "../dtos/user/login.dto";
import type { CreateUserRequestDTO } from "../dtos/user/create-user.dto";
import type { VerifyOtpRequestDTO } from "../dtos/user/verify-otp.dto";
export class AuthController {
  constructor(private _authService: IAuthService) {}

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) throw new AppError(USER_MESSAGES.AUTH.EXPIRED_TOKEN, RESPONSE_CODE.UNAUTHORIZED);
    const result = await this._authService.refreshToken(refreshToken);
    RespsonseHelper.success(res, result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._authService.login(req.body as LoginRequestDTO);
    RespsonseHelper.success(res, result);
  });
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._authService.register(req.body as CreateUserRequestDTO);
    RespsonseHelper.success(res, result);
  });
  verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._authService.verifyOtp(req.body as VerifyOtpRequestDTO);
    RespsonseHelper.success(res, result);
  });
  resendOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._authService.resendOtp(req.body.email);
    RespsonseHelper.success(res, result);
  });
}
