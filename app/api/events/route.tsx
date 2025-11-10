import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET(request: Request) {
  return new Response(`Hello this is the API route response! for ${request}`);
}

export async function POST(request: NextRequest) {
  try {
    await c;
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Event creation failed!",
      error: e instanceof Error ? e.message : "unknown",
    });
  }
}
