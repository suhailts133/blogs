export const API_ROUTES = {
  AUTH: {
    SIGN_UP: "/auth/signup",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    LOGIN: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh",
  },
  BLOG: {
    ONE: "/blog",
    CREATE: "/blog/create",
    MY: "/blog/my",
    ALL: "/blog/all",
    DELETE: "/blog/delete",
    UPDATE: "/blog/update",
  },
} as const;
