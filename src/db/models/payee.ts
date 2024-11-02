import { Payee, PayeeInput } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_PAYEE = "payees";

export const getPayees = async () => {
  const db = await getDb();

  const payees = (await db
    .collection(COLLECTION_PAYEE)
    .find({})
    .toArray()) as Payee[];

  return payees;
};

export const createPayee = async (payeeInfo: PayeeInput) => {
  const modifiedPayeeInfo = {
    ...payeeInfo,
    userId: new ObjectId(payeeInfo.userId),
  };

  const db = await getDb();

  const result = await db
    .collection(COLLECTION_PAYEE)
    .insertOne(modifiedPayeeInfo);

  return result;
};

export const getPayeeById = async (id: string) => {
  const db = await getDb();

  const payee = (await db
    .collection(COLLECTION_PAYEE)
    .findOne({ _id: new ObjectId(id) })) as Payee;

  return payee;
};

export const getPayeeByUserId = async (userId: string) => {
  const db = await getDb();
  const id = new ObjectId(userId)

  const payee = (await db
    .collection(COLLECTION_PAYEE)
    .findOne({ userId: id })) as Payee;

  return payee;
};
