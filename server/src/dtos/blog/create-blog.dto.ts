import { z } from "zod";
import { textField } from "../shared/fields";

export const createBlogSchema = z.object({
  title: textField("Title is required", "Title must be at least 7 characters","Title must be under 100 characters", 7, 100),
  description: textField("description is required", "description must be at least 15 characters","description must be under 500 characters", 15, 500),
});

export type CreateBlogDTO = z.infer<typeof createBlogSchema>;
