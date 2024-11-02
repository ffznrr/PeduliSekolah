import { Category, CategoryInput } from "@/utils/types";
import { getDb } from "./user";

const COLLECTION_CATEGORY = "categories";

export const getCategories = async () => {
  const db = await getDb();

  const categories = (await db
    .collection(COLLECTION_CATEGORY)
    .find({})
    .toArray()) as Category[];

  return categories;
};

export const createCategory = async (categoryInput: CategoryInput) => {
  const db = await getDb();

  const result = await db
    .collection(COLLECTION_CATEGORY)
    .insertOne(categoryInput);

  return result;
};
