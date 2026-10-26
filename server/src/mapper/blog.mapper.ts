import type { BlogsDTO, UpdatePrefillBlogDTO } from "../dtos/blog/blog.dto";
import type {  IBlog, IBlogPopulated } from "../interface/blog/blog.interface";

export class BlogMapper {
  static toBlogUpdateDto(blog: IBlog): UpdatePrefillBlogDTO {
    return {
      blogId: blog.id,
      title: blog.title,
      description: blog.description,
      image: blog.image.path,
    };
  }
  static toBlogDto(blog: IBlogPopulated): BlogsDTO {
    return {
      blogId: blog.id,
      title: blog.title,
      description: blog.description,
      image: blog.image.path,
      createdAt: blog.createdAt.toDateString(),
      userName: blog.userId.name,
    };
  }

  static toBlogDtos(blogs: IBlogPopulated[]): BlogsDTO[] {
    return blogs.map(BlogMapper.toBlogDto);
  }
}
