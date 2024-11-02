import { CreatePostInput, Post } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_POST = "posts";

// Aggregation pipeline with lookup and vote counting
const agg = [
  {
    $lookup: {
      from: "votes",
      localField: "_id",
      foreignField: "postId",
      as: "votes",
    },
  },
  {
    $project: {
      _id: 1,
      title: 1,
      content: 1,
      userId: 1,
      slug: 1,
      categoryId: 1,
      tags: 1,
      imageUrl: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
      deadLineAt: 1,
      amount: 1,
      target_amount: 1,
      featured_status: 1,
      meta_description: 1,
      votes: { $size: { $ifNull: ["$votes", []] } }, // Count votes and handle null values
    },
  },
];

export const getPosts = async (
  page: number,
  category: string,
  searchTerm: string,
) => {
  const db = await getDb();
  const perPage = 10;
  const skip = (page - 1) * perPage;

  // Build query object based on category and search term
  const query: any = {
    status: "published",
  };
  if (category && category !== "All") {
    query.categoryId = new ObjectId(category); // Correct the field name
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
  }

  // Use aggregate directly, since you're combining lookup and projection
  const posts = (await db
    .collection(COLLECTION_POST)
    .aggregate([
      { $match: query }, // Match based on the query filter
      { $skip: skip },
      { $limit: perPage },
      ...agg, // Apply the aggregation pipeline
    ])
    .toArray()) as Post[];

  return posts;
};

export const getPostsAdmin = async (
  page: number,
  category: string,
  searchTerm: string,
) => {
  const db = await getDb();
  const perPage = 10;
  const skip = (page - 1) * perPage;

  // Build query object based on category and search term
  const query: any = {
    status: "draft",
  };
  if (category && category !== "All") {
    query.categoryId = new ObjectId(category); // Correct the field name
  }
  if (searchTerm) {
    query.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
  }

  // Use aggregate directly, since you're combining lookup and projection
  const posts = (await db
    .collection(COLLECTION_POST)
    .aggregate([
      { $match: query }, // Match based on the query filter
      { $skip: skip },
      { $limit: perPage },
      ...agg, // Apply the aggregation pipeline
    ])
    .toArray()) as Post[];

  return posts;
};

export const getPostsFeatured = async () => {
  const db = await getDb();
  const posts = (await db
    .collection(COLLECTION_POST)
    .find({ featured_status: true })
    .toArray()) as Post[];

  return posts;
};

export const adminGetPosts = async () => {
  const db = await getDb();

  const posts = (await db
    .collection(COLLECTION_POST)
    .find({ status: "draft" })
    .toArray()) as Post[];

  return posts;
};

export const createPost = async (postInput: CreatePostInput) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_POST).insertOne({
    ...postInput,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return result;
};

export const updatePostPublished = async (id: string) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_POST).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: "published",
      },
    },
  );

  return result;
};

export const updatePostRejected = async (id: string) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_POST).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: "rejected",
      },
    },
  );

  return result;
};

export const getPostBySlug = async (slug: string) => {
  const db = await getDb();

  const post = (await db.collection(COLLECTION_POST).findOne({ slug })) as Post;

  return post;
};

export const deletePostById = async (id: string) => {
  const db = await getDb();

  const result = await db
    .collection(COLLECTION_POST)
    .deleteOne({ _id: new ObjectId(id) });

  return result;
};

export const pinPostById = async (id: string) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_POST).updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        featured_status: true,
      },
    },
  );

  return result;
};

export const getPostsByCategory = async (categoryId: string) => {
  const db = await getDb();

  const posts = (await db
    .collection(COLLECTION_POST)
    .find({ categoryId: new ObjectId(categoryId) })
    .toArray()) as Post[];

  return posts;
};

export const getPostById = async (id: string) => {
  const db = await getDb();

  const post = (await db
    .collection(COLLECTION_POST)
    .findOne({ _id: new ObjectId(id) })) as Post;

  return post;
};

export const getPostByUserId = async (id: string) => {
  const db = await getDb();

  const posts = (await db
    .collection(COLLECTION_POST)
    .find({ userId: new ObjectId(id) })
    .toArray()) as Post[];

  return posts;
};
