"use server";

import { User } from "@/utils/types";
import { cookies } from "next/headers";
import { getUser } from "./action";

const ProfileServer = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token, "INI DARI PROFILE SERVER");

  let profile: User | null = null;
  if (token) {
    profile = await getUser(token);
  }

  return profile;
};

export default ProfileServer;
