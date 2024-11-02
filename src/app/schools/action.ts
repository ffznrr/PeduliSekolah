import { getDocuments } from "@/db/models/schoolDocument";

export const getSchools = async () => {
  const data = await getDocuments();

  return data;
};
