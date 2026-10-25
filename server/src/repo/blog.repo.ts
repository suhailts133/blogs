import type { IBlog } from "../interface/blog/blog.interface";
import type { IBlogRepo } from "../interface/blog/blog.repo.interface";
import type { Pagination } from "../interface/common/api.response.interface";
import { BlogModel } from "../models/blog.model";
import { BaseRepository } from "./base.repo";

export class BlogRepo extends BaseRepository<IBlog> implements IBlogRepo {
  constructor() {
    super(BlogModel);
  }

  async getMyBlogs(id: string, page?: string): Promise<{ data: IBlog[]; pagination: Pagination }> {
    const pageNo = Number(page) || 1;
    const limit = 2;
    const skip = (pageNo - 1) * limit;
    const [result, total] = await Promise.all([
      this.find({ userId: id }, { skip, limit, sort: { createdAt: -1 } }),
      this.countDocuments({ userId: id }),
    ]);
    const pagination: Pagination = {
      total,
      totalPages: Math.ceil(total / limit),
    };
    return {
      data: result,
      pagination,
    };
  }
  async getAllBlogs(page?: string): Promise<{ data: IBlog[]; pagination: Pagination }> {
    const pageNo = Number(page) || 1;
    const limit = 2;
    const skip = (pageNo - 1) * limit;
    const [result, total] = await Promise.all([
      this.find({}, { skip, limit, sort: { createdAt: -1 } }),
      this.countDocuments({}),
    ]);
    const pagination: Pagination = {
      total,
      totalPages: Math.ceil(total / limit),
    };
    return {
      data: result,
      pagination,
    };
  }
}
