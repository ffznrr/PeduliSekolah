import { getDocuments } from "@/db/models/schoolDocument";
import { SchoolProfile } from "@/utils/types"; // Assuming SchoolProfile has _id as string
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Define the response format
type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export async function GET(request: NextRequest) {
  try {
    // Fetch school documents from the database
    const schools = await getDocuments();

    // Log detailed info to debug
    if (!schools || schools.length === 0) {
      console.warn("No schools found.");
    } else {
      console.log(`Fetched ${schools.length} schools`, schools);
    }

    // Convert schools to match SchoolProfile type
    const formattedSchools: SchoolProfile[] = schools.map((school) => ({
      ...school,
      _id: new ObjectId(school._id), // Convert ObjectId to string
      userId: new ObjectId(school._id),
    }));

    // Return the fetched school data
    return NextResponse.json<MyResponse<SchoolProfile[]>>({
      statusCode: 200,
      data: formattedSchools, // Wrap in the response structure
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching schools:", error);

    // Return an error response
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Failed to fetch schools",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
