import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function GET(request: Request) {
  return new Response(`Hello this is the API route response! for ${request}`);
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();

    //Parse data from formData
    let event;
    try {
      event = Object.fromEntries(formData.entries());
      //console.log("Event Data:", event);
    } catch (e) {
      return NextResponse.json(
        {
          message: "Invalid form data",
          error: e instanceof Error ? e.message : "unknown",
        },
        { status: 400 }
      );
    }

    //Create event in the database
    const createdEvent = await Event.create(event);
    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event creation failed!",
        error: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 }
    );
  }
}
