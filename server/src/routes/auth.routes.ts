import { Router } from "express";
import { authController } from "../containers/controller";
import { createUserSchema } from "../dtos/user/create-user.dto";
import { zodValidate } from "../middlewares/zodValidation";
import { verifyOtpSchema } from "../dtos/user/verify-otp.dto";
import { LoginSchema } from "../dtos/user/login.dto";

const router = Router();

router.post("/signup", zodValidate(createUserSchema), authController.register);
router.post("/verify-otp", zodValidate(verifyOtpSchema), authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", zodValidate(LoginSchema), authController.login);
router.post("/refresh", authController.refreshToken);
export const authRoutes = router;
