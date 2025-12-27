import dayjs from "dayjs";
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    success: true,
    health: "OK",
    timestamp: Date.now(),
    date: dayjs().format("DD-MM-YYYY"),
  });
}
