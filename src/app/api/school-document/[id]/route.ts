import { getDocumentByUserId } from "@/db/models/schoolDocument";
import { SchoolDocument } from "@/utils/types";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type Response = SchoolDocument;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { message: "Missing id", data: null },
      { status: 400 },
    );
  }

  const objectId = new ObjectId(id);

  try {
    const schoolData = await getDocumentByUserId(objectId);

    if (!schoolData) {
      return NextResponse.json(
        { message: "School not found", data: null },
        { status: 404 },
      );
    }

    return NextResponse.json<Response>(schoolData);
  } catch (error) {
    console.error("Error fetching school:", error);
    return NextResponse.json(
      { message: "Failed to fetch school", error },
      { status: 500 },
    );
  }
}
