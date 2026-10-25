export const USER_MESSAGES = {
  AUTH: {
    TOKEN_NOT_FOUND: "Token not found.",
    TOKEN_INVALID: "Invalid or expired token.",
    NEW_TOKEN_CREATED: "A new access token was created successfully.",
    EXPIRED_TOKEN: "Your session has expired. Please log in again.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    LOGIN_SUCCESS: "Logged in successfully.",
    REGISTER_SUCCESS: "An OTP has been sent to your email.",
    OTP_FAILED: "Failed to send the OTP. Please try again later.",
    REGISTER_FAILED: "Registration failed. Please try again later.",
    ALREADY_EXSITS: "An account with this email already exists.",
    OTP_SUCCESS: "OTP verification completed successfully.",
    OTP_RESEND: "The OTP has been resent to your email successfully.",
    OTP_INCORRECT: "The OTP you entered is incorrect.",
    OTP_EXPIRED: "The OTP has expired. Please request a new one.",
  },
  USER: {
    NOT_FOUND: "User not found.",
    ALREADY_EXISTS: "User already exists.",
    NOT_AUTHORIZED: "You must be logged in to post a blog.",
  },
} as const;
