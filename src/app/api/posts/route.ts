import { NextResponse } from "next/server";
import { getPosts } from "@/db/models/post";
import { createPost } from "@/db/models/post";
import { ObjectId } from "mongodb";
import { z } from "zod";

// Define a Zod schema to validate the post input
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
  imageUrl: z.array(z.string()).nonempty("At least one image is required"),
  deadLineAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid deadline date",
  }),
  amount: z.number().positive("Amount must be positive"),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract query parameters from the request URL
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";

    // Fetch posts from the database with pagination, category, and search
    const posts = await getPosts(Number(page), category, search);

    // Response object with paginated posts
    return NextResponse.json({
      data: posts,
      currentPage: Number(page),
      totalPages: Math.ceil(posts.length / Number(limit)),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
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
  imageUrl: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deadLineAt: Date;
  amount: number;
  target_amount: number;
  featured_status: boolean;
  meta_description?: string;
};

export const POST = async (req: Request) => {
  try {
    // Parse the incoming JSON payload
    const {
      title,
      content,
      categoryId,
      amount,
      tags,
      imageUrl, // Array of image URLs
      deadLineAt,
      meta_description,
    } = await req.json();

    // Validate incoming data with Zod
    const validationResult = postSchema.safeParse({
      title,
      content,
      categoryId,
      amount: Number(amount),
      tags,
      imageUrl,
      deadLineAt,
      meta_description,
    });

    if (!validationResult.success) {
      // Return errors if validation fails
      return NextResponse.json(
        { error: validationResult.error.format() }, // Format errors for response
        { status: 400 }
      );
    }

    // Simulate getting userId from a session/cookie (replace with actual user logic)
    const userId = new ObjectId(); // Replace with actual userId

    // Create a new post object
    const newPost = {
      title,
      content,
      userId,
      slug: title.toLowerCase().replace(/ /g, "-"), // Create a slug from the title
      categoryId: new ObjectId(categoryId), // Convert categoryId to ObjectId
      tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [], // Convert tags to array
      imageUrl, // Already an array of image URLs
      deadLineAt: new Date(deadLineAt),
      amount: 0,
      target_amount: Number(amount), // Assuming a default target amount (can be dynamic)
      featured_status: false, // Default status
      status: "draft", // Default post status
      meta_description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the post into the database using the createPost function
    const result = await createPost(newPost);

    // Log success and return a success response
    console.log("Post successfully created:", result);
    return new Response(JSON.stringify({ success: true, postId: result.insertedId }), {
      status: 201,
    });

  } catch (err) {
    // Handle errors gracefully
    if (err instanceof Error) {
      console.log("Error creating post:", err.message);
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "An unknown error occurred." }),
        { status: 500 }
      );
    }
  }
};
