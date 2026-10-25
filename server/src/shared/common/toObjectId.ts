import mongoose from "mongoose";

export const toObjectId = (field: string) => new mongoose.Types.ObjectId(field);
