import connectMongo from "@/db/dbConfig";
import vaultItemSchema from "@/lib/schema/vaultItemSchema";
import { UserVault } from "@/models/userVaultModel";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

await connectMongo();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = vaultItemSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: result.error.issues,
          success: false,
        },
        { status: 404 }
      );
    }

    const data = result.data;

    const vaultItem = await UserVault.create({
      userId: data.userId,
      websiteName: data.websiteName,
      websiteLink: data.websiteLink || "",
      email: data.email,
      password: data.password,
      username: data.username || "",
      notes: data.notes || "",
    });

    if (!vaultItem) {
      return NextResponse.json(
        {
          message: "error adding credentials",
          errors: null,
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        errors: null,
        message: "Credential added.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding a vault item ->", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
          success: false,
          errors: null,
        },
        { status: 500 }
      );
    }
  }
}
