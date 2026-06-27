import { connectMongo } from "@/db/dbConfig";
import { UserVault } from "@/models/userVaultModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    await connectMongo();
    const userId = (await params).userId;

    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    if (!userId || userId === "") {
      return NextResponse.json(
        {
          success: false,
          message: "user id missing in request",
          errors: null,
        },
        { status: 404 },
      );
    }

    // const userCredentials = await UserVault.find({ userId: userId });

    const userCredentials = await UserVault?.paginate(
      {
        userId: userId,
        ...(search && {
          websiteName: {
            $regex: search,
            $options: "i", // case-insensitive
          },
        }),
      },
      {
        page: page ? parseInt(page) : 0,
        limit: limit ? parseInt(limit) : 10,
      },
    );

    if (!userCredentials) {
      return NextResponse.json(
        {
          success: false,
          message: "error fetching user information",
          errors: null,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Credentials fetched successfully",
        errors: null,
        success: true,
        data: userCredentials,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching credentials->", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        errors: error instanceof Error ? error.message : error,
      },
      { status: 500 },
    );
  }
}
