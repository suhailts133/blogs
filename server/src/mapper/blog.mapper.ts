import type { BlogsDTO } from "../dtos/blog/blog.dto";
import type { IBlog } from "../interface/blog/blog.interface";

export class BlogMapper {
  static toBlogDto(blog: IBlog): BlogsDTO {
    return {
      blogId: blog.id,
      title: blog.title,
      description: blog.description,
      image: blog.image.path,
    };
  }

  static toBlogDtos(blogs: IBlog[]): BlogsDTO[] {
    return blogs.map(BlogMapper.toBlogDto);
  }
}
