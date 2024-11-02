"use client";

import Link from "next/link";
import Image from "next/image";
import LogoNavbarPNG from "@/assets/logo-navbar-transparant.png";
import { useRouter } from "next/navigation";
import {
  deleteAuthCookies,
  getAuthCookies,
} from "@/app/admin/SchoolList/action";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function NavbarPublic() {
  const router = useRouter();
  const [token, setToken] = useState<string | undefined>(undefined);
  // Function to delete the token (if stored in localStorage)
  const handleLogout = async () => {
    const success = await deleteAuthCookies();
    if (success) {
      router.push("/login");
      await signOut();
    } else {
      await signOut();
      router.push("/login");
    }
  };

  useEffect(() => {
    const getToken = async () => {
      const data = await getAuthCookies();
      setToken(data?.value ?? undefined);
    };
    getToken();
  }, []);

  return (
    <header className="bg-[#2C3E50] text-[#ECF0F1] py-2 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Image
              src={LogoNavbarPNG}
              alt="PeduliSekolah logo"
              width={200}
              height={40}
              className="object-contain"
            />
          </div>
          <nav className="flex-1 hidden md:flex justify-center space-x-6">
            <Link
              href="/post"
              className="hover:text-[#E67E22] transition duration-200"
            >
              Donation
            </Link>
          </nav>
          <div className="flex-1 flex justify-end space-x-4">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-[#E67E22] text-[#ECF0F1] px-4 py-2 rounded-md hover:bg-[#D35400] transition duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-[#E67E22] text-[#ECF0F1] px-4 py-2 rounded-md hover:bg-[#D35400] transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
