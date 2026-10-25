import { Schema } from "mongoose";
import type { ImageResult } from "../interface/common/image.interface";

export const imageFormatSchema = new Schema<ImageResult>(
  {
    path: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { _id: false }
);
