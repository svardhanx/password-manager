import z from "zod";

export const userSecuritySchema = z.object({
  userId: z.string().trim(),
  salt: z.string().trim(),
  encryptedVerifier: z.string(),
  kdf: z.object({
    algorithm: z.string(),
    hash: z.string(),
    iterations: z.number(),
    keyLength: z.number(),
  }),
});

export type userSecuritySchemaType = z.infer<typeof userSecuritySchema>;
