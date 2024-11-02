import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db/models/user";
import { Transaction } from "@/utils/types";
import { ObjectId, WithId } from "mongodb";

export async function POST(request: NextRequest) {
  const { orderId, payment_method, payment_status, payment_date } = await request.json();

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const db = await getDb();

  // Update transaction in the database
  await db.collection("transactions").updateOne(
    { orderId: orderId }, 
    {
      $set: {
        payment_method: payment_method,
        payment_status: payment_status,
        payment_date: new Date(payment_date),
        updatedAt: new Date(),
      },
    }
  );

  // Fetch the updated transaction and cast to Transaction type
  const result = await db.collection("transactions").findOne({ orderId });

  // Use type assertion here
  const transaction: Transaction | null = result as Transaction | null;

  if(transaction?.payment_status === "success"){
    const postId = transaction.postId; // Retrieve the postId from the transaction
    const donatedAmount = transaction.amount; // The donated amount

    console.log(postId);
    

    // Update the post's amount by incrementing with the donated amount
    await db.collection("posts").updateOne(
      { _id: new ObjectId(postId) }, // Find the post by _id
      {
        $inc: { amount: donatedAmount }, // Increment the amount
        $set: { updatedAt: new Date() }, // Update the updatedAt timestamp
      }
    );
  }

  return NextResponse.json({ message: "Transaction status updated successfully", transaction });
}
