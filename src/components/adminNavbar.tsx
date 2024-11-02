"use client";

import Link from "next/link";
import LogoNavbarPNG from "@/assets/logo-navbar-transparant.png";
import Image from "next/image";
import { deleteAuthCookies } from "@/app/admin/SchoolList/action";
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteAuthCookies();
    router.push("/login");
  };

  return (
    <>
      <div className="w-full h-[64px] bg-[#2C3E50] flex justify-between p-2 border-b-2">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={LogoNavbarPNG}
            alt="PeduliSekolah logo"
            width={200}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <div className="dropdown dropdown-end sm:hidden">
            <div
              tabIndex={0}
              role="button"
              className="m-1"
            >
              <button className="btn btn-square btn-ghost text-wh">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/admin/SchoolVerify">
                  <h1 className="text-center p-3">School Verify</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/SchoolList">
                  <h1 className="text-center p-3">School List</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/ProjectList">
                  <h1 className="text-center p-3">Post List</h1>
                </Link>
              </li>
              <li>
                <Link href="/admin/PostVerify">
                  <h1 className="text-center p-3">Post Verify</h1>
                </Link>
              </li>
              <li>
                <div onClick={handleLogout}>
                  <h1 className="text-center px-7 py-4">Logout</h1>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
