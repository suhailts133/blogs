import { AuthController } from "../controller/auth.controller";
import { BlogController } from "../controller/blog.controller";
import { authService, blogService } from "./service";

export const authController = new AuthController(authService);
export const blogController = new BlogController(blogService);
