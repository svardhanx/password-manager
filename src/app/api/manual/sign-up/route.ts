import { signUp } from "@/lib/actions/auth-actions";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { message: "Email missing in your request" },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { message: "Password missing in your request" },
        { status: 400 }
      );
    }

    const response = await signUp(name, email, password);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error: ", error);
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error?.message });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
}
