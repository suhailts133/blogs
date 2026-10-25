import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../../shared/errors/appError";
import type { IImageUploaderService, ImageResult } from "../../interface/common/image.interface";
import { RESPONSE_CODE } from "../../shared/constants/statusCode";
import { env } from "../../config/env.config";
import { INFRA_MESSAGES } from "../../shared/messages/infraMessages";

export class CloudinaryService implements IImageUploaderService {
  constructor() {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: Express.Multer.File, folder: string): Promise<ImageResult> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
        if (error || !result) {
          reject(new AppError(INFRA_MESSAGES.CLODUNIARY.UPLOAD_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR));
        } else {
          resolve({ path: result.secure_url, filename: result.public_id });
        }
      });
      stream.end(file.buffer);
    });
  }

  async delete(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }
        if (result.result !== "ok" && result.result !== "not found") {
          return reject(new AppError(INFRA_MESSAGES.CLODUNIARY.DELETE_FAILED, RESPONSE_CODE.INTERNAL_SERVER_ERROR));
        }
        resolve();
      });
    });
  }
}
