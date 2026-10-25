import type { CreateUserRequestDTO } from "../../dtos/user/create-user.dto";
import type { LoginRequestDTO } from "../../dtos/user/login.dto";
import type { VerifyOtpRequestDTO } from "../../dtos/user/verify-otp.dto";
import type { AuthResponseDTO, IApiResponse, RefreshTokenDTO } from "../common/api.response.interface";

export interface IAuthService {
  login(data: LoginRequestDTO): Promise<IApiResponse<AuthResponseDTO>>;
  verifyOtp(data: VerifyOtpRequestDTO): Promise<IApiResponse<AuthResponseDTO>>;
  register(data: CreateUserRequestDTO): Promise<IApiResponse>;
  resendOtp(email: string): Promise<IApiResponse>;
  refreshToken(refreshToken: string): Promise<IApiResponse<RefreshTokenDTO>>;
}
