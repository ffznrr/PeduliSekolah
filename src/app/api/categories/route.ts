import { getCategories } from "@/db/models/category";
import { Category } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

type Response = Category[];

export async function GET(request: NextRequest) {
  try {
    const categories = await getCategories();

    if (!categories || categories.length === 0) {
      console.warn("No categories found");
    } else {
      console.log(`Fetched ${categories.length} categories`, categories);
    }

    return NextResponse.json<Response>(categories);
  } catch (error) {
    console.error("Error fetching categories", error);

    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        message: "Failed to fetch categories",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
