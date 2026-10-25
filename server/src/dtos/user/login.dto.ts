import { z } from "zod";
import { emailField, passwordField } from "../shared/fields";

export const LoginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginRequestDTO = z.infer<typeof LoginSchema>;
