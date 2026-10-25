import type { Response } from "express";
import { RESPONSE_CODE } from "../constants/statusCode";
import type { IApiResponse, IApiResponseWithPagination } from "../../interface/common/api.response.interface";

export class RespsonseHelper {
  static success<T>(res: Response, data: Partial<IApiResponse<T>>) {
    const { statuscode = RESPONSE_CODE.OK, success = true, ...jsonData } = data;
    return res.status(statuscode).json({ success, ...jsonData });
  }
  static successWithPagination<T>(res: Response, data: IApiResponseWithPagination<T>) {
    const { statuscode = RESPONSE_CODE.OK, success = true, ...jsonData } = data;
    return res.status(statuscode).json({ success, ...jsonData });
  }
}
