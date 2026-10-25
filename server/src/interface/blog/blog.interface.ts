import type mongoose from "mongoose";
import type { ImageResult } from "../common/image.interface";

export interface IBlog {
  id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: ImageResult;
  createdAt: string;
}
