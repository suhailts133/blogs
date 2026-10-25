export interface IApiResponse<T = null> {
  success?: boolean;
  message: string;
  data?: T;
  statuscode?: number;
}

export interface IApiResponseWithPagination<T> extends IApiResponse<T> {
  total: number;
  totalPages: number;
}

export interface AuthResponseDTO {
  jwtToken: string;
  refreshToken: string;
  user: UserRepsonseDTO;
}

export interface UserRepsonseDTO {
  id: string;
  email: string;
  name: string;
}

export interface RefreshTokenDTO {
  newAccessToken: string;
}

export interface Pagination {
  total: number;
  totalPages: number;
}
