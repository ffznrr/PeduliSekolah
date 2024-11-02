"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerTokenableProtection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Membaca cookies
  const cookiesStore = cookies();

  // Mengambil token dari cookies
  const token = cookiesStore.get("token");

  console.log(token);

  // Mengecek apabila token tidak ada, maka redirect ke halaman login
  if (token) {
    redirect("/");
  }

  // Di sini kita hanya akan mengembalikan children
  return <>{children}</>;
};

export default ServerTokenableProtection;
