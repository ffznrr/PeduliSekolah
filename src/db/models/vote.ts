import { AddVote, Vote } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_VOTE = "votes";

export const getVotes = async () => {
  const db = await getDb();

  const votes = (await db
    .collection(COLLECTION_VOTE)
    .find({})
    .toArray()) as Vote[];

  return votes;
};

export const getVotesByPostId = async (postId: string) => {
  const db = await getDb();

  const votes = (await db
    .collection(COLLECTION_VOTE)
    .find({ postId: new ObjectId(postId) })
    .toArray()) as Vote[];

  return votes;
};

export const addVote = async (vote: AddVote) => {
  const modifiedVote = {
    userId: new ObjectId(vote.userId),
    postId: new ObjectId(vote.postId),
  };

  const db = await getDb();

  const result = await db.collection(COLLECTION_VOTE).insertOne(modifiedVote);

  return result;
};
