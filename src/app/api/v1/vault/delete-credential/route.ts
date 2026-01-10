import connectMongo from "@/db/dbConfig";
import { UserVault } from "@/models/userVaultModel";
import { NextRequest, NextResponse } from "next/server";

await connectMongo();

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("ID", body);

    if (!body.id) {
      return NextResponse.json({
        success: false,
        errors: null,
        message: "Invalid request. Identifier Missing.",
      });
    }

    await UserVault.findByIdAndDelete(body.id);

    return NextResponse.json(
      {
        success: true,
        errors: null,
        message: "Entry deleted.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting a vault item ->", error);
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
