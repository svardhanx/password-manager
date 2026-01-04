import connectMongo from "@/db/dbConfig";
import { UserSecurity } from "@/models/userSecurityModel";
import { NextRequest, NextResponse } from "next/server";

await connectMongo();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id || id === "") {
      return NextResponse.json(
        {
          success: false,
          message: "id missing in request",
          errors: null,
        },
        { status: 404 }
      );
    }

    const user = await UserSecurity.findOne({ userId: id });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "error fetching user information",
          errors: null,
        },
        { status: 404 }
      );
    }

    const salt = user.salt;

    const encryptedVerifier = user.encryptedVerifier;

    return NextResponse.json({
      success: true,
      errors: null,
      message: "success",
      salt,
      encryptedVerifier,
    });
  } catch (error) {
    console.error("Error in retrieving salt logic:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          errors: error,
        },
        { status: 500 }
      );
    }
  }
}
