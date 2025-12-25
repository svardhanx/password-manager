import z from "zod";

export const credentialSchema = z.object({
  websiteLink: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^https:\/\/.+/.test(value), {
      message: "Website link must be a valid HTTPS URL",
    }),

  websiteName: z
    .string()
    .trim()
    .nonempty("Website name is required")
    .min(3, "Website name must be at least 3 characters"),
  email: z.email(),
  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password cannot be greater than 30 characters"),
  username: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});
