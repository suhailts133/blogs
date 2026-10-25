import type { AuthResponseDTO, UserRepsonseDTO } from "../interface/common/api.response.interface";
import type { IUser } from "../interface/user/user.interface";

export class UserMapper {
  static toResponseDTO(user: IUser): UserRepsonseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
  static toAuthResponseDTO(user: IUser, accessToken: string, refreshToken: string): AuthResponseDTO {
    const userData = UserMapper.toResponseDTO(user);
    return {
      user: userData,
      jwtToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
