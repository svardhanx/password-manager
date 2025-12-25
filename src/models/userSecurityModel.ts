import mongoose from "mongoose";

const userSecuritySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    salt: {
      type: String,
      required: [true, "Salt is required"],
    },
    kdf: {
      algorithm: { type: String, required: true },
      hash: { type: String, required: true },
      iterations: { type: Number, required: true },
      keyLength: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export const UserSecurity = mongoose.model(
  "User_Security",
  userSecuritySchema,
  "user_security"
);
