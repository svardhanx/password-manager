import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password cannot be greater than 30 characters"),
});
