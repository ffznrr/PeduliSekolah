"use server";
import {
  adminGetPosts,
  updatePostPublished,
  updatePostRejected,
} from "@/db/models/post";
import { Post } from "@/utils/types";

export const getAdminPostList = async () => {
  const data = (await adminGetPosts()) as Post[];
  return data;
};

export const postPublished = async (id: string) => {
  const result = await updatePostPublished(id);
  return result;
};

export const postRejected = async (id: string) => {
  const result = await updatePostRejected(id);
  return result;
};
