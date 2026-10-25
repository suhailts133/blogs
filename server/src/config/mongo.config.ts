import { connect } from "mongoose";
import { ensureError } from "../shared/errors/ensureError";
import { env } from "./env.config";

const connectDB = async () => {
  try {
    const MONGODB_URI = env.MONGO_URI;

    if (!MONGODB_URI) {
      console.log("MongoDB connection string is not defined");
      process.exit(1);
    }
    await connect(MONGODB_URI);
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    const err = ensureError(error).message;
    console.log("DB connection faild: ", err);
    process.exit(1);
  }
};

export default connectDB;
