"use server";

import { redirect } from "next/navigation";
import { createUser } from "@/db/models/user";
import { z } from "zod";

// Define the RegisterLogic function with proper type handling
export const RegisterLogic = async (formData: FormData) => {
  const registerInput = z.object({
    username: z.string({ message: "Username is required" }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Must be in email format" }),
    phoneNumber: z.string().optional(),
    password: z
      .string({ message: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" }),
    accountType: z.enum(["personal", "school"], {
      errorMap: () => ({ message: "Please select an account type" }),
    }),
  });

  // Extracting form data and ensuring correct types (FormDataEntryValue | null)
  const rawData = {
    username: formData.get("username") as string | null,
    email: formData.get("email") as string | null,
    password: formData.get("password") as string | null,
    phoneNumber: formData.get("phoneNumber") as string | null,
    accountType: formData.get("accountType") as string | null,
  };

  // Perform null checks before validation
  if (
    !rawData.username ||
    !rawData.email ||
    !rawData.password ||
    !rawData.accountType
  ) {
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register?error=Missing%20required%20fields`,
    );
  }

  // Validate fields using Zod
  const validatedFields = registerInput.safeParse(rawData);

  if (!validatedFields.success) {
    const errorPath = validatedFields.error.issues[0].path[0];
    const errorMessage = validatedFields.error.issues[0].message;

    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register?error=${encodeURIComponent(
        `${errorPath}: ${errorMessage}`,
      )}`,
    );
  }

  let check;

  try {
    const role = "user";
    const status = "active";
    const phoneNumberValue = validatedFields.data.phoneNumber || "";

    // User data for DB insertion
    const userDataForNewUser = {
      username: validatedFields.data.username,
      email: validatedFields.data.email,
      phone_number: phoneNumberValue,
      password: validatedFields.data.password,
      account_type: validatedFields.data.accountType,
      role: role,
      status: status,
      type: "origin"
    };

    await createUser(userDataForNewUser);
    check = true;
  } catch (error) {
    console.log(error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return redirect(
        `/register?error=Validation%20error:%20${encodeURIComponent(
          firstError.message,
        )}`,
      );
    }

    return redirect(
      `/register?error=Server%20Error:%20Please%20try%20again%20later`,
    );
  }

  if (check) {
    return redirect(`/login`);
  }
};
