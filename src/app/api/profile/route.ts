import { NextResponse } from "next/server";
import * as jose from "jose";
import { verifyTokenJose } from "@/utils/jose";
import { getUserById } from "@/db/models/user";

export const dynamic = 'force-dynamic';  // Explicitly mark this route as dynamic

export const GET = async (request: Request) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload: jose.JWTPayload = await verifyTokenJose(token);
    const userId = payload.id as string;

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
