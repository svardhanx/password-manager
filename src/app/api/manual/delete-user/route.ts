import { deleteUser } from "@/lib/actions/auth-actions";
import { NextResponse, type NextRequest } from "next/server";

type Response = { success: boolean; message: string };

export async function DELETE(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password === null || password === undefined) {
      return NextResponse.json({
        message: "Password incorrect or was not provided",
        success: false,
      });
    }

    const response = (await deleteUser(password)) as Response;

    if (response) return NextResponse.json(response);
  } catch (error) {
    console.error("Error occurred", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
