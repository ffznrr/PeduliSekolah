import { NextResponse } from "next/server";
import { createPayee, getPayeeByUserId } from "@/db/models/payee"; // Add your db query method
import { PayeeInput } from "@/utils/types";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import * as z from "zod"; // Import Zod for validation

// Zod schema for validation
const payeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  bankAccount: z.string().min(1, "Bank account is required"),
  walletId: z.string().optional(),
});

async function getUserIdFromHeaderOrCookies(headers: Headers): Promise<ObjectId> {
  let userId: string | undefined = headers.get('x-userid') as string;

  if (!userId) {
    const userIdCookie = cookies().get("userId");
    if (userIdCookie) {
      userId = userIdCookie.value; // Access the value from the cookie object
    }
  }

  if (!userId) {
    throw new Error("Unauthorized: userId is missing from headers or cookies.");
  }

  return new ObjectId(userId);
}

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromHeaderOrCookies(req.headers);
    const body = await req.json();

    // Validate the input data using Zod
    const validationResult = payeeSchema.safeParse(body);

    if (!validationResult.success) {
      // Return error if validation fails
      return NextResponse.json({ success: false, message: "Validation error", errors: validationResult.error.format() }, { status: 400 });
    }

    const { name, email, bankAccount, walletId } = validationResult.data;

    // Check if a payee with the same userId and email/bankAccount already exists
    const existingPayee = await getPayeeByUserId(userId.toString());

    if (existingPayee) {
      return NextResponse.json({ success: false, message: "Payee already exists with the given email or bank account" }, { status: 409 });
    }

    const payeeInfo: PayeeInput = {
      name,
      email,
      bank_account: bankAccount,
      wallet_id: walletId,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    };

    const result = await createPayee(payeeInfo);

    return NextResponse.json({ success: true, message: "Payee created successfully", result });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
}
