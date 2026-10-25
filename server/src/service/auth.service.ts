import type { LoginRequestDTO } from "../dtos/user/login.dto";
import type { IApiResponse, AuthResponseDTO, RefreshTokenDTO } from "../interface/common/api.response.interface";
import type { IUserRepo } from "../interface/user/user.repo.interface";
import type { IAuthService } from "../interface/user/user.service.interface";
import { comparePassword, hashPassword } from "../shared/common/hashPassword";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { AppError } from "../shared/errors/appError";
import { USER_MESSAGES } from "../shared/messages/userMessages";
import type { JwtData } from "../shared/jwt/jwt.types";
import { jwtAccessToken } from "../shared/jwt/access.token";
import { jwtRefreshToken, refeshTokenVerificaion } from "../shared/jwt/refresh.token";
import { UserMapper } from "../mapper/user.mapper";
import type { CreateUserRequestDTO } from "../dtos/user/create-user.dto";
import generateOtp from "../shared/common/generateOtp";
import type { IRedisRepo } from "../interface/common/redis.interface";
import { sendVerificationEmail } from "../infrastructure/email/brevo.email";
import type { VerifyOtpRequestDTO } from "../dtos/user/verify-otp.dto";

export class AuthService implements IAuthService {
  constructor(
    private _userRepo: IUserRepo,
    private _redisRepo: IRedisRepo
  ) {}

  async refreshToken(refreshToken: string): Promise<IApiResponse<RefreshTokenDTO>> {
    const token = refeshTokenVerificaion(refreshToken);
    if (!token) throw new AppError(USER_MESSAGES.AUTH.EXPIRED_TOKEN, RESPONSE_CODE.UNAUTHORIZED);

    const tokenPayload: JwtData = {
      email: token.email,
      userId: token.userId,
      name: token.name,
    };
    const accessToken = jwtAccessToken(tokenPayload);
    return { message: USER_MESSAGES.AUTH.NEW_TOKEN_CREATED, data: { newAccessToken: accessToken } };
  }

  async login(data: LoginRequestDTO): Promise<IApiResponse<AuthResponseDTO>> {
    const user = await this._userRepo.findByEmail(data.email);
    if (!user) {
      throw new AppError(USER_MESSAGES.AUTH.INVALID_CREDENTIALS, RESPONSE_CODE.UNAUTHORIZED);
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(USER_MESSAGES.AUTH.INVALID_CREDENTIALS, RESPONSE_CODE.UNAUTHORIZED);
    }
    const tokenPayload: JwtData = {
      email: user.email,
      userId: user.id,
      name: user.name,
    };
    const accessToken = jwtAccessToken(tokenPayload);
    const refreshToken = jwtRefreshToken(tokenPayload);
    const authResponse = UserMapper.toAuthResponseDTO(user, accessToken, refreshToken);
    return { message: USER_MESSAGES.AUTH.LOGIN_SUCCESS, data: authResponse };
  }

  async register(data: CreateUserRequestDTO): Promise<IApiResponse> {
    const user = await this._userRepo.findByEmail(data.email);
    if (user) throw new AppError(USER_MESSAGES.AUTH.ALREADY_EXSITS, RESPONSE_CODE.CONFLIT);

    const otp = generateOtp();
    const hashedPassword = await hashPassword(data.password);
    const isOtpSaved = await this._redisRepo.saveUserData({
      name: data.name,
      email: data.email,
      otp,
      password: hashedPassword,
    });
    if (!isOtpSaved) throw new AppError(USER_MESSAGES.AUTH.REGISTER_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    const isEmailSent = await sendVerificationEmail(data.email, otp);
    if (!isEmailSent) throw new AppError(USER_MESSAGES.AUTH.OTP_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    return { message: USER_MESSAGES.AUTH.REGISTER_SUCCESS };
  }

  async verifyOtp(data: VerifyOtpRequestDTO): Promise<IApiResponse<AuthResponseDTO>> {
    const user = await this._userRepo.findByEmail(data.email);
    if (user) throw new AppError(USER_MESSAGES.USER.ALREADY_EXISTS, RESPONSE_CODE.CONFLIT);

    const pendingUser = await this._redisRepo.getUserData(data.email);
    if (!pendingUser) throw new AppError(USER_MESSAGES.AUTH.OTP_EXPIRED, RESPONSE_CODE.CONFLIT);

    if (pendingUser.otp !== data.otp) throw new AppError(USER_MESSAGES.AUTH.OTP_INCORRECT, RESPONSE_CODE.BAD_REQUEST);
    const newUser = await this._userRepo.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: pendingUser.password,
    });
    await this._redisRepo.deleteOTP(newUser.email);
    const tokenPayload: JwtData = {
      email: newUser.email,
      userId: newUser.id,
      name: newUser.name,
    };
    const accessToken = jwtAccessToken(tokenPayload);
    const refreshToken = jwtRefreshToken(tokenPayload);
    const authResponse = UserMapper.toAuthResponseDTO(newUser, accessToken, refreshToken);
    return { message: USER_MESSAGES.AUTH.OTP_SUCCESS, data: authResponse, statuscode: RESPONSE_CODE.CREATED };
  }

  async resendOtp(email: string): Promise<IApiResponse> {
    const user = await this._userRepo.findByEmail(email);
    if (user) {
      throw new AppError(USER_MESSAGES.USER.ALREADY_EXISTS, RESPONSE_CODE.CONFLIT);
    }
    const otp = generateOtp();
    const isOtpUpdated = await this._redisRepo.editUserData(otp, email);
    if (!isOtpUpdated) throw new AppError(USER_MESSAGES.AUTH.OTP_EXPIRED, RESPONSE_CODE.BAD_REQUEST);
    const isEmailSend = await sendVerificationEmail(email, otp);
    if (!isEmailSend) throw new AppError(USER_MESSAGES.AUTH.OTP_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    return { message: USER_MESSAGES.AUTH.OTP_RESEND };
  }
}
