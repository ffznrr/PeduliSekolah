import { NextResponse } from "next/server";
import { adminGetPosts } from "@/db/models/post"; // Make sure this points to your actual post fetching function

export async function GET(req: Request) {
  try {
    // Call the function that fetches school posts/documents (adjust if needed)
    const posts = await adminGetPosts();

    // Check if there are no posts found
    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { data: [], message: "No schools found" },
        { status: 200 },
      );
    }

    // Respond with the fetched posts data
    return NextResponse.json({
      data: posts,
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts. Please try again later." },
      { status: 500 },
    );
  }
}
