import mongoose from "mongoose";

const userSecuritySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
      trim: true,
    },
    salt: {
      type: String,
      required: [true, "Salt is required"],
    },
    encryptedVerifier: {
      type: String,
      required: [true, "Verifier is required"],
    },
    kdf: {
      algorithm: { type: String, required: true },
      hash: { type: String, required: true },
      iterations: { type: Number, required: true },
      keyLength: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

export const UserSecurity =
  mongoose.models.User_Security ||
  mongoose.model("User_Security", userSecuritySchema, "user_security");
