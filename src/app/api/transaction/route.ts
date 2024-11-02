import { NextRequest, NextResponse } from "next/server";
import _ from 'lodash';
import { MidtransClient } from "midtrans-node-client";
import { TransactionInput } from "@/utils/types";
import { AddTransaction } from "@/db/models/transaction";  // Import your DB handler
import { ObjectId } from "mongodb";

let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data || data.length === 0) {
    throw new Error("Data not found");
  }

  const itemDetails = data.map((item: any) => ({
    id: item._id,
    price: _.ceil(parseFloat(item.amount.toString())),
    quantity: 1, 
    name: item.userId || "Donor",
  }));

  const grossAmount = _.sumBy(itemDetails, 'price');
  const orderId = _.random(100000, 999999).toString();  // Generate order ID

  // Set Midtrans parameters
  const parameter = {
    item_details: itemDetails, 
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount 
    }
  };

  const token = await snap.createTransactionToken(parameter);

  const payeeId = new ObjectId(data[0].userId);
  const postId = new ObjectId(data[0]._id);  // Use post's _id to relate transaction

  // Prepare transaction data to store in DB
  const transactionData: TransactionInput = {
    userId: payeeId, // User making the donation
    postId,          // Post related to the donation
    orderId,
    amount: grossAmount,
    payeeId: payeeId, // Payee (recipient) ID
    payment_method: "", // To be filled after payment
    payment_status: "pending", // Initial status is pending
    payment_token: token,
    payment_date: new Date(),
    payer_notes: "", // Optional
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Save the transaction to the database
  await AddTransaction(transactionData);

  return NextResponse.json({
    token,
    orderId
  });
}
