"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { Category } from "@/utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for DatePicker

export type PostInput = {
  title: string;
  content: string;
  slug: string;
  categoryId: string;
  amount: number;
  tags: string;
  imageUrl: string[];
  deadLineAt: Date;
  meta_description: string;
};

type FormErrors = {
  [key: string]: {
    _errors: string[];
  };
};

export default function Component() {
  const { control, handleSubmit } = useForm<PostInput>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // Form errors with a more specific type
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      const url = "/api/categories";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setCategories(json);
      } catch (err) {
        console.error(err instanceof Error ? err.message : "Unknown error");
      }
    };
    fetchCategory();
  }, []);

  const onSubmit = async (data: PostInput) => {
    setIsSubmitting(true);

    // Handle image URLs
    if (imageUrls.length === 0) {
      data.imageUrl = [""]; // If no images, set to empty array
    } else {
      data.imageUrl = imageUrls; // Use uploaded images
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Parse the JSON response

      if (response.ok) {
        router.push("/post");
      } else {
        // Handle errors returned from the server
        console.error("Submission error:", result.error);
        setFormErrors(result.error); // Set form errors state
      }
    } catch (err) {
      console.error("Submission error:", err);
    }

    setIsSubmitting(false);
  };

  const handleUploadSuccess = (result: any) => {
    if (result?.info?.secure_url) {
      setImageUrls((prev) => [...prev, result.info.secure_url]);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#ECF0F1] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#2C3E50]">
          Create New Post
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-[#34495E]">
              Title
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    type="text"
                    id="title"
                    placeholder="Post title"
                    className={`border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60] ${
                      formErrors.title ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.title && (
                    <p className="text-red-500 text-sm">
                      {formErrors.title._errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-medium text-[#34495E]">
              Content
            </Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <>
                  <Textarea
                    {...field}
                    rows={4}
                    id="content"
                    placeholder="Post content"
                    className={`border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60] ${
                      formErrors.content ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.content && (
                    <p className="text-red-500 text-sm">
                      {formErrors.content._errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="categoryId"
              className="text-sm font-medium text-[#34495E]"
            >
              Category
            </Label>
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    className="block w-full p-2 bg-white border-[#2C3E50] rounded-md focus:ring-[#27AE60] focus:border-[#27AE60]"
                  >
                    {categories.map((el, i) => (
                      <option key={i} value={el._id.toString()}>
                        {el.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {formErrors.categoryId._errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-[#34495E]">
              Tags (comma-separated)
            </Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    type="text"
                    id="tags"
                    placeholder="Post tags"
                    className={`border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60] ${
                      formErrors.tags ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.tags && (
                    <p className="text-red-500 text-sm">
                      {formErrors.tags._errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="deadLineAt"
              className="text-sm font-medium text-[#34495E]"
            >
              Deadline At
            </Label>
            <Controller
              name="deadLineAt"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className={`block w-full p-2 border-[#2C3E50] rounded-md focus:ring-[#27AE60] focus:border-[#27AE60] ${
                    formErrors.deadLineAt ? "border-red-500" : ""
                  }`}
                />
              )}
            />
            {formErrors.deadLineAt && (
              <p className="text-red-500 text-sm">
                {formErrors.deadLineAt._errors[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-[#34495E]">
              Amount
            </Label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    type="number"
                    id="amount"
                    placeholder="Amount"
                    className={`border-[#2C3E50] focus:ring-[#27AE60] focus:border-[#27AE60] ${
                      formErrors.amount ? "border-red-500" : ""
                    }`}
                  />
                  {formErrors.amount && (
                    <p className="text-red-500 text-sm">
                      {formErrors.amount._errors[0]}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <Label htmlFor="imageUrl" className="text-sm font-medium text-[#34495E]">
              Upload Images
            </Label>
            <CldUploadButton
              onSuccess={handleUploadSuccess}
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
              className="block w-full border-[#2C3E50] rounded-md p-2 bg-[#27AE60] text-white"
            >
              Upload Images
            </CldUploadButton>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}
