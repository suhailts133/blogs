import { createBlogSchema } from "./create-blog.dto";
import { z } from "zod";

export const updateBlogSchema = createBlogSchema.partial().extend({
  newImage: z.enum(["true", "false"]).transform((value) => value === "true"),
  blogId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid blog ID."),
});

export type UpdateBlogDTO = z.infer<typeof updateBlogSchema>;