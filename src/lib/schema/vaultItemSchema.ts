import z from "zod";

const vaultItemSchema = z.object({
  _id: z.string().optional(),
  userId: z.string(),
  websiteName: z.string(),
  websiteLink: z.string().optional(),
  email: z.email(),
  password: z.string(),
  username: z.string().optional(),
  notes: z.string().optional(),
});

export default vaultItemSchema;
