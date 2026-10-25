// schemas/updateBlogSchema.ts
import { z } from "zod";
import { createBlogSchema } from "./createBlogSchema";
import { imageField } from "../../../shared/schema/imageField";

export const editBlogSchema = createBlogSchema.extend({
  blog: imageField("blog", true),
});

export type EditBlogFormType = z.infer<typeof editBlogSchema>;
