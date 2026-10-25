declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        userId: string;
        name: string;
      };
    }

    namespace Multer {
      interface File {
        path: string;
        filename: string;
      }
    }
  }
}

export {};
