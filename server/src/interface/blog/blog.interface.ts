import type mongoose from "mongoose";
import type { ImageResult } from "../common/image.interface";
import type { IUser } from "../user/user.interface";

export interface IBlog {
  id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image: ImageResult;
  createdAt: Date;
}

export type IBlogPopulated = Omit<IBlog, "userId"> & {
  userId: IUser;
};
