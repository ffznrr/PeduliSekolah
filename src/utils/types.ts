import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId | string;
  username?: string;
  email: string;
  password: string;
  phone_number?: string;
  role: string;
  type: string;
  account_type: string;
  status: string;
};

export type CreateUserInput = Omit<User, "_id">;

export type Category = {
  _id: ObjectId;
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryInput = Omit<Category, "_id">;

export type Post = {
  _id: ObjectId;
  title: string;
  content: string;
  userId: ObjectId;
  slug: string;
  categoryId: ObjectId;
  tags: string[];
  imageUrl: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deadLineAt: Date;
  amount: number;
  target_amount: number;
  featured_status: boolean;
  meta_description?: string;
};

export type CreatePostInput = Omit<Post, "_id">;

export type Vote = {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
};

export type AddVote = Omit<Vote, "_id">;

export type SchoolDocument = {
  _id: ObjectId;
  name: string;
  email: string;
  phoneNumber: string;
  userId: ObjectId;
  imageFileUrl?: string[] | undefined;
  description?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  purpose: string;
  status: string;
  location: string;
};

export type SchoolProfile = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  location: string;
};

export type SchoolDocumentInput = Omit<SchoolDocument, "_id">;

export type Transaction = {
  _id: ObjectId;
  userId: ObjectId;
  postId: ObjectId;
  orderId: string;
  amount: number;
  payeeId: ObjectId;
  payment_method: string;
  payment_status: string;
  payment_token: string;
  payment_date: Date;
  payer_notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionInput = Omit<Transaction, "_id">;

export type Payee = {
  _id: ObjectId;
  name: string;
  email: string;
  bank_account: string;
  wallet_id?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: ObjectId;
};

export type PayeeInput = Omit<Payee, "_id">;
