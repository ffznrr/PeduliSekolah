import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/config";
import { CreateUserInput, User } from "@/utils/types";
import { hashPassword } from "@/utils/bcrypt";

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_USER = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find({})
    .project({ password: 0 })
    .toArray()) as User[];

  return users;
};

export const createUser = async (user: CreateUserInput): Promise<User> => {
  const modifiedUser: CreateUserInput = {
    ...user,
    password: hashPassword(user.password),
  };

  const db = await getDb();

  const check = await db
    .collection(COLLECTION_USER)
    .findOne({ email: user.email, type: user.type });

  if (check) {
    throw new Error("User already exists");
  }

  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  // Return the inserted document with the generated _id
  return {
    _id: result.insertedId,
    ...modifiedUser,
  };
};

export const getUserById = async (id: string): Promise<User | null> => {
  const objectId = new ObjectId(id);
  const db = await getDb();

  const user = await db
    .collection(COLLECTION_USER)
    .findOne({ _id: objectId }, { projection: { password: 0 } });

  return user as User;
};

export const getUserByEmailAndType = async (
  email: string,
  type: string,
): Promise<User | null> => {
  const db = await getDb();

  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email, type })) as User;

  return user;
};

export const bannedUser = async (id: string) => {
  const db = await getDb();

  const objectId = new ObjectId(id);

  const bannedUser = await db
    .collection(COLLECTION_USER)
    .updateOne({ _id: objectId }, { $set: { status: "banned" } });

  return bannedUser;
};

export const updateUserType = async (userId: string, newType: string) => {
  const db = await getDb();
  const objectId = new ObjectId(userId);

  const result = await db
    .collection(COLLECTION_USER)
    .updateOne({ _id: objectId }, { $set: { account_type: newType } });

  return result;
};

