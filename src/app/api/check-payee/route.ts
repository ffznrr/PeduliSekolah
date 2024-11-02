import { NextResponse } from "next/server";
import { getPayeeByUserId } from "@/db/models/payee"; // Adjust import path

export async function GET(req: Request) {
  // Create a URL object from the request URL
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ exists: false, message: "No userId provided" }, { status: 400 });
  }

  try {
    const payee = await getPayeeByUserId(userId);
    if (payee) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
