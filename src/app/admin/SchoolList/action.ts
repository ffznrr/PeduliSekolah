"use server";

import { getDocuments } from "@/db/models/schoolDocument";
import { bannedUser } from "@/db/models/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSchoolList = async () => {
  const data = await getDocuments();
  return data;
};

export const banUser = async (id: string) => {
  const result = await bannedUser(id);
  return result;
};

export const deleteAuthCookies = async () => {
  const cookieStore = cookies();
  cookieStore.delete("token");
  cookieStore.delete("userId");
  cookieStore.delete("username");
  cookieStore.delete("role");
  cookieStore.delete("accountType");
  cookieStore.delete("schoolstatus")
  
  return redirect("/login");
};

export const getAuthCookies = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return token;
};
