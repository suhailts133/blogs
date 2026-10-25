import mongoose, { Schema } from "mongoose";
import type { IUser } from "../interface/user/user.interface";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("User", userSchema);
