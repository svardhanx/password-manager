import mongoose from "mongoose";

const userVaultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
      index: true,
    },
    websiteName: {
      type: String,
      required: [true, "Website name is required"],
      trim: true,
    },
    websiteLink: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    username: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const UserVault = mongoose.model(
  "User_Vault",
  userVaultSchema,
  "user_vault"
);
