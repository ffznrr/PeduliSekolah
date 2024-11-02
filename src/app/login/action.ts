"use server";

import { comparePassword } from "@/utils/bcrypt";
import { createTokenJose } from "@/utils/jose";
import { cookies } from "next/headers";
import { z } from "zod";
import { getUserByEmailAndType } from "@/db/models/user";
import { getDocumentByUserId } from "@/db/models/schoolDocument";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export const actionLogin = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return { error: errFinalMessage }; // Return error instead of redirecting
  }

  // Retrieve user by email
  const user = await getUserByEmailAndType(parsedData.data.email, "origin");

  console.log(user);

  // Check if user exists and password is correct
  if (!user || !comparePassword(parsedData.data.password, user.password)) {
    return { error: "Invalid credentials" }; // Return error
  }

  const school = await getDocumentByUserId(new ObjectId(user._id));

  if (user.status === "banned") {
    return { error: "This user has been banned" }; // Return error
  }

  // Create token payload with user details
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
    account_type: user.account_type,
    username: user.username,
    schoolstatus: school?.status,
  };
  console.log(payload);

  // Generate token using jose
  const token = await createTokenJose(payload);

  // Set token as a cookie
  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // Expires in 3 days
    sameSite: "strict",
  });

  if (user.role === "admin") {
    return { admin: true };
  }

  return { success: true }; // Return success
};
