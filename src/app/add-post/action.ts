"use server";

import { z } from "zod";

// Define a Zod schema to validate the post input
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.string().min(1, "Tags are required"),
  imageUrl: z.array(z.string()).nonempty("At least one image is required"),
  deadline: z.date({
    required_error: "Deadline is required",
    invalid_type_error: "Invalid deadline date",
  }),
  amount: z.number().positive("Amount must be positive"),
});

const CreatePost = async (formData: FormData) => {
  // Extract fields from formData
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;
  const tags = formData.get("tags") as string;
  const imageUrl = formData.getAll("imageUrl") as string[];
  const deadline = formData.get("deadLineAt") ? new Date(formData.get("deadLineAt") as string) : null;
  const amount = formData.get("amount") ? parseFloat(formData.get("amount") as string) : null;

  // Create the post input object
  const postInput = {
    title,
    content,
    slug: `${title}-${content}`, // Generate a slug
    categoryId,
    tags,
    imageUrl,
    deadline,
    amount,
    meta_description: `${title}-${content}`,
  };

  // Validate the input using the Zod schema
  const validation = postSchema.safeParse(postInput);

  if (!validation.success) {
    // Return errors instead of just logging
    return {
      success: false,
      errors: validation.error.format(),
    };
  }

  // If validation passes, proceed with your logic (e.g., saving the post)
  console.log("Validated post input: ", validation.data);

  // Your logic to handle the validated post input (e.g., save to the database)

  return { success: true }; // Return a success response
};

export { CreatePost };
