import connectMongo from "@/db/dbConfig";
import vaultItemSchema from "@/lib/schema/vaultItemSchema";
import { UserVault } from "@/models/userVaultModel";
import { NextRequest, NextResponse } from "next/server";

await connectMongo();

export async function PUT(request: NextRequest) {
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

    if (!data._id) {
      return NextResponse.json(
        {
          message: "Invalid request. Identifier missing.",
          errors: null,
          success: false,
        },
        { status: 404 }
      );
    }

    const vaultItem = await UserVault.findByIdAndUpdate(data._id, {
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
        message: `Updated entry for ${vaultItem.websiteName}.`,
      },
      { status: 200 }
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
