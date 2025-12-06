import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";

//GET /api/events - Fetch all events
export async function GET(request: Request) {
  try {
    //connect to mongoDB and fetch events
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events: events,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: e instanceof Error ? e.message : "unknown",
      },
      { status: 501 }
    );
  }
}

//POST /api/events - Create a new event
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

    //get image file from formData
    const imageFile = formData.get("image") as File;
    if (!imageFile) {
      return NextResponse.json(
        {
          message: "Image file is required",
        },
        { status: 400 }
      );
    }
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvents" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(buffer);
    });

    //Add image URL to event data
    //event.image = uploadResult.secure_url;
    event.image = (uploadResult as { secure_url: string }).secure_url;

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
      { status: 501 }
    );
  }
}

// Route that accepts a slug as input -> returns the event details
