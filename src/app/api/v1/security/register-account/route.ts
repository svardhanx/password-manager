import { connectMongo } from "@/db/dbConfig";
import { UserSecurity } from "@/models/userSecurityModel";
import { userSecuritySchema } from "@/types/user-security-schema";
// import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  await connectMongo();
  try {
    const body = await request.json();

    const data = userSecuritySchema.parse(body);

    // const masterPassword = await bcrypt.hash(data.password, 12);

    const userSecurity = await UserSecurity.create({
      userId: data.userId,
      salt: data.salt,
      encryptedVerifier: data.encryptedVerifier,
      kdf: data.kdf,
    });

    if (!userSecurity)
      return NextResponse.json({
        message: "error registering user.",
        success: false,
        errors: null,
      });

    return NextResponse.json(
      {
        message: "user registered",
        success: true,
        errors: null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in registering account:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: "validation error",
        errors: error.issues,
        success: false,
      });
    }

    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        success: false,
        errors: error,
      });
    }
  }
}
