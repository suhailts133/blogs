import type { Pagination } from "../common/api.response.interface";
import type { IBaseRepository } from "../common/base.repo.interface";
import type { IBlog } from "./blog.interface";

export interface IBlogRepo extends IBaseRepository<IBlog> {
  getMyBlogs(id: string, page?: string): Promise<{ data: IBlog[]; pagination: Pagination }>;
  getAllBlogs(page?: string): Promise<{ data: IBlog[]; pagination: Pagination }>;
}
