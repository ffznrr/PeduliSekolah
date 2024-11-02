import { NextRequest, NextResponse } from "next/server";
import { MidtransClient } from "midtrans-node-client";
import { getTransactionById, updateTransactionStatus } from "@/db/models/transaction"; // Import functions to get and update transaction

let coreApi = new MidtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(request: NextRequest) {
  const notification = await request.json();

  const { order_id: orderId, transaction_status: status } = notification;

  // Fetch the transaction from your database
  const transaction = await getTransactionById(orderId);

  if (!transaction) {
    return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
  }

  // Update transaction status in your database
  await updateTransactionStatus(orderId, status);

  return NextResponse.json({ message: "Transaction status updated" });
}
