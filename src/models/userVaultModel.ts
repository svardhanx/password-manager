import { CredentialType } from "@/types/password-credentials";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

type UserVault = Omit<CredentialType, "_id">;

interface VaultDocument extends UserVault, mongoose.Document {
  // page: number;
  // limit: number;
}

const userVaultSchema = new mongoose.Schema<VaultDocument>(
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
  { timestamps: true },
);

userVaultSchema.index({ websiteName: "text" });

userVaultSchema.plugin(mongoosePaginate);

export const UserVault = mongoose.model<
  VaultDocument,
  mongoose.PaginateModel<VaultDocument>
>("User_Vault", userVaultSchema, "user_vault");
