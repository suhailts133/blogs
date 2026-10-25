import type { BlogsDTO } from "../../dtos/blog/blog.dto";
import type { CreateBlogDTO } from "../../dtos/blog/create-blog.dto";
import type { UpdateBlogDTO } from "../../dtos/blog/update-blog.dto";
import type { IApiResponse, IApiResponseWithPagination } from "../common/api.response.interface";

export interface IBlogService {
  createBlog(userId: string, data: CreateBlogDTO, image: Express.Multer.File): Promise<IApiResponse>;
  updateBlog(data: UpdateBlogDTO, image?: Express.Multer.File): Promise<IApiResponse>;
  deleteBlog(blogId: string): Promise<IApiResponse>;
  getMyBlogs(userId: string, page?: string): Promise<IApiResponseWithPagination<BlogsDTO[]>>;
  getBlog(blogId: string): Promise<IApiResponse<BlogsDTO>>;
  allBlogs(page?: string): Promise<IApiResponseWithPagination<BlogsDTO[]>>;
}
