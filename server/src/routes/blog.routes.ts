import { Router } from "express";
import { zodValidate } from "../middlewares/zodValidation";
import { createBlogSchema } from "../dtos/blog/create-blog.dto";
import multer from "multer";
import { blogController } from "../containers/controller";
import authenticate from "../middlewares/authenticate";
import { updateBlogSchema } from "../dtos/blog/update-blog.dto";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/create", authenticate, upload.single("blog"), zodValidate(createBlogSchema), blogController.createBlog);
router.patch("/update", authenticate, upload.single("blog"), zodValidate(updateBlogSchema), blogController.updateBlog);
router.get("/my", authenticate, blogController.getMyBlogs);
router.get("/all", blogController.allBlogs);
router.delete("/delete/:id", authenticate, blogController.deleteBlog);
router.get("/:id", blogController.getBlog);

export const blogRoutes = router;
