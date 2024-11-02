import { NextResponse } from "next/server";
import { addDocument, getDocumentByUserId } from "@/db/models/schoolDocument";
import { ObjectId } from "mongodb";
import { SchoolDocumentInput } from "@/utils/types";
import { cookies } from "next/headers";
import { z } from "zod";

// Zod schema to validate the incoming data
const schoolDocumentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is too short"),
  purpose: z.string().min(1, "Purpose is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  imageFileUrl: z.array(z.string().url()).optional(),
});

// Function to get userId from the request header or cookies
async function getUserIdFromHeaderOrCookies(headers: Headers): Promise<ObjectId> {
  let userId: string | undefined = headers.get('x-userId') as string;

  if (!userId) {
    const userIdCookie = cookies().get("userId");
    if (userIdCookie) {
      userId = userIdCookie.value;
    }
  }

  if (!userId) {
    throw new Error("Unauthorized: userId is missing from headers or cookies.");
  }

  return new ObjectId(userId);
}

// POST handler
export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromHeaderOrCookies(req.headers);
    const jsonData = await req.json();
    const parsedData = schoolDocumentSchema.parse(jsonData);

    const existingDocument = await getDocumentByUserId(userId);
    if (existingDocument) {
      return NextResponse.json({ success: false, message: "A school document for this user already exists." }, { status: 400 });
    }

    const schoolDocument: SchoolDocumentInput = {
      ...parsedData,
      phoneNumber: parsedData.phone,
      userId,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await addDocument(schoolDocument);
    return NextResponse.json({ success: true, message: "School profile created", result }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: error.errors.map(err => err.message) }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
}
