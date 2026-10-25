import mongoose, { Schema } from "mongoose";

import type { IBlog } from "../interface/blog/blog.interface";
import { imageFormatSchema } from "./image.schema";

const blogSchema = new Schema<IBlog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: imageFormatSchema, required: true },
  },
  { timestamps: true }
);
export const BlogModel = mongoose.model("Blog", blogSchema);
