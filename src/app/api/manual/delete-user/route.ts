import { connectMongo } from "@/db/dbConfig";
import { deleteUser } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import { UserSecurity } from "@/models/userSecurityModel";
import { UserVault } from "@/models/userVaultModel";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

type Response = { success: boolean; message: string };

await connectMongo();

export async function DELETE(request: NextRequest) {
  const { password } = await request.json();

  if (!password || password === null || password === undefined) {
    return NextResponse.json({
      message: "Password incorrect or was not provided",
      success: false,
    });
  }

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    await UserSecurity.deleteOne({ userId: userId });

    await UserVault.deleteMany({ userId: userId });

    const response = (await deleteUser(password)) as Response;

    if (!response.success) {
      throw new Error(response.message || "Better Auth deletion failed");
    }

    await dbSession.commitTransaction();

    return NextResponse.json(response);
  } catch (error) {
    await dbSession.abortTransaction();
    console.error("Error occurred", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } finally {
    await dbSession.endSession();
  }
}
