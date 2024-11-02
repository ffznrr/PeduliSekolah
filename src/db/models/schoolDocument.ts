import { SchoolDocument, SchoolDocumentInput } from "@/utils/types";
import { getDb } from "./user";
import { ObjectId } from "mongodb";

const COLLECTION_DOCUMENT = "schoolDocuments";

export const getDocuments = async () => {
  const db = await getDb();

  const documents = (await db
    .collection(COLLECTION_DOCUMENT)
    .find({})
    .toArray()) as SchoolDocument[];
  console.log(documents);

  return documents;
};

export const getDocumentById = async (id: string) => {
  const db = await getDb();

  const document = (await db
    .collection(COLLECTION_DOCUMENT)
    .findOne({ _id: new ObjectId(id) })) as SchoolDocument;

  return document;
};

export const getDocumentByUserId = async (id: ObjectId) => {
  const db = await getDb();

  const document = (await db
    .collection(COLLECTION_DOCUMENT)
    .findOne({ userId: id })) as SchoolDocument;

  return document;
};

export const addDocument = async (document: SchoolDocumentInput) => {
  const db = await getDb();
  const modifiedDocument = {
    ...document,
    userId: new ObjectId(document.userId),
  };

  const result = await db
    .collection(COLLECTION_DOCUMENT)
    .insertOne(modifiedDocument);

  return result;
};

export const updateSchoolDocumentStatus = async (
  documentId: string,
  newStatus: string,
) => {
  const db = await getDb();
  const objectId = new ObjectId(documentId);

  console.log(newStatus);

  const result = await db
    .collection(COLLECTION_DOCUMENT)
    .updateOne({ _id: objectId }, { $set: { status: newStatus } });

  return result;
};
