import connectMongo from "@/db/dbConfig";
import { credentialSchema } from "@/lib/schema/credentialSchema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

await connectMongo();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const data = credentialSchema.parse(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: "Validation error",
        errors: error.issues,
        success: false,
      });
    }

    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message,
        success: false,
        errors: null,
      });
    }
  }
}
