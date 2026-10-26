import type { BlogsDTO, UpdatePrefillBlogDTO } from "../dtos/blog/blog.dto";
import type { CreateBlogDTO } from "../dtos/blog/create-blog.dto";
import type { UpdateBlogDTO } from "../dtos/blog/update-blog.dto";
import type { IBlog } from "../interface/blog/blog.interface";
import type { IBlogRepo } from "../interface/blog/blog.repo.interface";
import type { IBlogService } from "../interface/blog/blog.service.interface";
import type { IApiResponse, IApiResponseWithPagination } from "../interface/common/api.response.interface";
import type { IImageUploaderService } from "../interface/common/image.interface";
import { BlogMapper } from "../mapper/blog.mapper";
import { toObjectId } from "../shared/common/toObjectId";
import { CLOUDINARY_FOLDER_NAME } from "../shared/constants/cloudinaryFolders";
import { RESPONSE_CODE } from "../shared/constants/statusCode";
import { AppError } from "../shared/errors/appError";
import { BLOG_MESSAGES } from "../shared/messages/blogMessages";

export class BlogService implements IBlogService {
  constructor(
    private _blogRepo: IBlogRepo,
    private _imageService: IImageUploaderService
  ) {}

  async createBlog(userId: string, data: CreateBlogDTO, image: Express.Multer.File): Promise<IApiResponse> {
    const imageResult = await this._imageService.upload(image, CLOUDINARY_FOLDER_NAME.BLOG);
    const blog = await this._blogRepo.create({ ...data, userId: toObjectId(userId), image: imageResult });
    if (!blog) throw new AppError(BLOG_MESSAGES.BLOG.CREATION_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    return { message: BLOG_MESSAGES.BLOG.CREATED, statuscode: RESPONSE_CODE.CREATED };
  }

  async updateBlog(data: UpdateBlogDTO, image?: Express.Multer.File): Promise<IApiResponse> {
    const { blogId, newImage, ...rest } = data;
    const blog = await this._blogRepo.findById(blogId);
    if (!blog) throw new AppError(BLOG_MESSAGES.BLOG.NOT_FOUND, RESPONSE_CODE.NOT_FOUND);
    const updatedData: Partial<IBlog> = { ...rest };
    if (newImage) {
      if (!image) {
        throw new AppError(BLOG_MESSAGES.BLOG.IMAGE_REQUIRED, RESPONSE_CODE.BAD_REQUEST);
      }
      updatedData.image = await this._imageService.upload(image, CLOUDINARY_FOLDER_NAME.BLOG);
    }
    const updatedBlog = await this._blogRepo.update(blogId, updatedData);
    if (!updatedBlog) throw new AppError(BLOG_MESSAGES.BLOG.UPDATE_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    await this._imageService.delete(blog.image.filename);
    return { message: BLOG_MESSAGES.BLOG.UPDATED };
  }

  async deleteBlog(blogId: string): Promise<IApiResponse> {
    const blog = await this._blogRepo.findById(blogId);
    if (!blog) throw new AppError(BLOG_MESSAGES.BLOG.NOT_FOUND, RESPONSE_CODE.NOT_FOUND);
    const isDeleted = await this._blogRepo.delete(blogId);
    if (!isDeleted) throw new AppError(BLOG_MESSAGES.BLOG.DELETION_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR);
    await this._imageService.delete(blog.image.filename);
    return { message: BLOG_MESSAGES.BLOG.DELETED };
  }

  async getMyBlogs(userId: string, page?: string): Promise<IApiResponseWithPagination<BlogsDTO[]>> {
    const { data, pagination } = await this._blogRepo.getMyBlogs(userId, page);
    const blogData = BlogMapper.toBlogDtos(data);
    return {
      message: BLOG_MESSAGES.BLOG.MY_BLOGS,
      total: pagination.total,
      totalPages: pagination.totalPages,
      data: blogData,
    };
  }
  async allBlogs(page?: string): Promise<IApiResponseWithPagination<BlogsDTO[]>> {
    const { data, pagination } = await this._blogRepo.getAllBlogs(page);
    const blogData = BlogMapper.toBlogDtos(data);
    return {
      message: BLOG_MESSAGES.BLOG.ALL_BLOGS,
      total: pagination.total,
      totalPages: pagination.totalPages,
      data: blogData,
    };
  }

  async getBlog(blogId: string): Promise<IApiResponse<UpdatePrefillBlogDTO>> {
    const blog = await this._blogRepo.findById(blogId);
    if (!blog) throw new AppError(BLOG_MESSAGES.BLOG.NOT_FOUND, RESPONSE_CODE.NOT_FOUND);
    const blogData = BlogMapper.toBlogUpdateDto(blog);
    return { message: BLOG_MESSAGES.BLOG.FETCH_ONE, data: blogData };
  }
}
