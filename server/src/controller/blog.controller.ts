import type { IBlogService } from "../interface/blog/blog.service.interface";
import asyncHandler from "express-async-handler";
import type { Request, Response } from "express";
import { AppError } from "../shared/errors/appError";
import { USER_MESSAGES } from "../shared/messages/userMessages";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { RespsonseHelper } from "../shared/common/responseHelper";
import type { CreateBlogDTO } from "../dtos/blog/create-blog.dto";
import { BLOG_MESSAGES } from "../shared/messages/blogMessages";
import type { UpdateBlogDTO } from "../dtos/blog/update-blog.dto";

export class BlogController {
  constructor(private _blogService: IBlogService) {}
  createBlog = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new AppError(USER_MESSAGES.USER.NOT_AUTHORIZED, RESPONSE_CODE.UNAUTHORIZED);
    if (!req.file) throw new AppError(BLOG_MESSAGES.BLOG.IMAGE_REQUIRED, RESPONSE_CODE.BAD_REQUEST);

    const result = await this._blogService.createBlog(
      userId,
      req.body as CreateBlogDTO,
      req.file as Express.Multer.File
    );
    RespsonseHelper.success(res, result);
  });

  updateBlog = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as UpdateBlogDTO;

    if (body.newImage && !req.file) throw new AppError(BLOG_MESSAGES.BLOG.IMAGE_REQUIRED, RESPONSE_CODE.BAD_REQUEST);

    const result = await this._blogService.updateBlog(body, req.file as Express.Multer.File);
    RespsonseHelper.success(res, result);
  });

  deleteBlog = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._blogService.deleteBlog(req.params.id as string);
    RespsonseHelper.success(res, result);
  });

  getMyBlogs = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw new AppError(USER_MESSAGES.USER.NOT_AUTHORIZED, RESPONSE_CODE.UNAUTHORIZED);
    const result = await this._blogService.getMyBlogs(userId, req.query.page as string);
    RespsonseHelper.successWithPagination(res, result);
  });

  allBlogs = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._blogService.allBlogs(req.query.page as string);
    RespsonseHelper.successWithPagination(res, result);
  });

  getBlog = asyncHandler(async (req: Request, res: Response) => {
    const result = await this._blogService.getBlog(req.params.id as string);
    RespsonseHelper.success(res, result);
  });
}
