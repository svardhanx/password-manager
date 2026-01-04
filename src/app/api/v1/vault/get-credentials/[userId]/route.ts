import { UserVault } from "@/models/userVaultModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;

    if (!userId || userId === "") {
      return NextResponse.json(
        {
          success: false,
          message: "user id missing in request",
          errors: null,
        },
        { status: 404 }
      );
    }

    const userCredentials = await UserVault.find({ userId: userId });

    if (!userCredentials) {
      return NextResponse.json(
        {
          success: false,
          message: "error fetching user information",
          errors: null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Credentials fetched successfully",
        errors: null,
        success: true,
        data: userCredentials,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching credentials->", error);
  }
}
