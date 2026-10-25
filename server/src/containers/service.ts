import { AuthService } from "../service/auth.service";
import { BlogService } from "../service/blog.service";
import { cloudinaryService } from "./infra";
import { blogRepo, redisRepo, userRepo } from "./repo";

export const authService = new AuthService(userRepo, redisRepo);
export const blogService = new BlogService(blogRepo, cloudinaryService);
