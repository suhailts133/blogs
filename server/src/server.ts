import express from "express";
import cors, { type CorsOptions } from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import connectDB from "./config/mongo.config";
import connectRedis from "./config/redis.config";
import { env } from "./config/env.config";
import { authRoutes } from "./routes/auth.routes";
import { blogRoutes } from "./routes/blog.routes";
const app = express();
const PORT = env.PORT;

const corsOptions: CorsOptions = {
  origin: env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);

app.use(globalErrorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("failed to start the server: ", error);
    process.exit(1);
  }
};

startServer();
