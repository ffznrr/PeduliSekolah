import { getDocumentById } from "@/db/models/schoolDocument";
import { SchoolDocument } from "@/utils/types";
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

  try {
    const schoolData = await getDocumentById(id);

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
