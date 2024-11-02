import { Transaction, TransactionInput } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_TRANSACTION = "transactions";

export const getTransactions = async () => {
  const db = await getDb();

  const transactions = (await db
    .collection(COLLECTION_TRANSACTION)
    .find({})
    .toArray()) as Transaction[];

  return transactions;
};

export const getTransactionById = async (id: string) => {
  const db = await getDb();

  const transaction = (await db
    .collection(COLLECTION_TRANSACTION)
    .findOne({ _id: new ObjectId(id) })) as Transaction;

  return transaction;
};

export const getTransactionByUserId = async (userId: string) => {
  const db = await getDb();

  const transaction = (await db
    .collection(COLLECTION_TRANSACTION)
    .findOne({ userId: new ObjectId(userId) })) as Transaction;

  return transaction;
};

export const updateTransactionStatus = async (id: string, status: string) => {
  const db = await getDb();
  
  const result = await db.collection(COLLECTION_TRANSACTION).updateOne(
    { _id: new ObjectId(id) }, 
    { $set: { status } } // Update the transaction status
  );

  return result;
};

export const AddTransaction = async (transaction: TransactionInput) => {
  const db = await getDb();

  console.log(transaction);
  

  const modifiedTransaction = {
    ...transaction,
    userId: new ObjectId(transaction.userId),
  };

  const result = await db
    .collection(COLLECTION_TRANSACTION)
    .insertOne(modifiedTransaction);

  return result;
};
