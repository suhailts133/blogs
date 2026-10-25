export interface ImageResult {
  path: string;
  filename: string;
}

export interface IImageUploaderService {
  upload(file: Express.Multer.File, folder: string): Promise<ImageResult>;
  delete(publicId: string): Promise<void>;
}
