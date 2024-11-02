import { NextResponse } from "next/server";
import { getPostsFeatured } from "@/db/models/post";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    // Fetch the featured posts from the database
    const featuredPosts = await getPostsFeatured();

    // Return the featured posts as a JSON response
    return NextResponse.json({ 
      data: featuredPosts 
    });
  } catch (error) {
    // Handle errors gracefully and return a 500 error response
    return NextResponse.json(
      { error: "Failed to fetch featured posts" },
      { status: 500 }
    );
  }
}

export type Post = {
  _id: ObjectId;
  title: string;
  content: string;
  userId: ObjectId;
  slug: string;
  categoryId: ObjectId;
  tags: string[];
  imageUrl: [string];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deadLineAt: Date;
  amount: number;
  target_amount: number;
  featured_status: boolean;
  meta_description?: string;
};
