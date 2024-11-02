"use server";

import { deletePostById, getPosts, pinPostById } from "@/db/models/post";
import { Post } from "@/utils/types";

export const getPostsList = async (
  page: number,
  category: string,
  searchTerm: string,
) => {
  const data = (await getPosts(page, category, searchTerm)) as Post[];

  return data;
};

export const pinPost = async (id: string) => {
  const result = await pinPostById(id);
  return result;
};

export const deletePost = async (id: string) => {
  const result = await deletePostById(id);
  return result;
};
