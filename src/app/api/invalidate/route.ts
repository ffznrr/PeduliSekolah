import { NextResponse } from "next/server";
import { getUserById, updateUserType } from "@/db/models/user";
import { updateSchoolDocumentStatus } from "@/db/models/schoolDocument";

export async function POST(request: Request) {
  try {
    const { userId, schoolDocumentId } = await request.json(); // Expecting the userId in the request body
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await updateUserType(userId, "Personal");
    await updateSchoolDocumentStatus(schoolDocumentId, "Layak");
    return NextResponse.json({
      message: "User account type updated to Personal",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
