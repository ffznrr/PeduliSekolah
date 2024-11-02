"use client";
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  HomeIcon,
  ClipboardIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ComponentType, SVGProps } from "react";
import { LogOutIcon } from "lucide-react";
import { deleteAuthCookies } from "@/app/admin/SchoolList/action";

interface NavItem {
  href: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
}

const navItems = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "School List", href: "/admin/SchoolList", icon: ClipboardIcon },
  { name: "Post List", href: "/admin/ProjectList", icon: ClipboardIcon },
  { name: "Post Verify", href: "/admin/PostVerify", icon: CheckCircleIcon },
];

const navLogout = [{ name: "Logout", href: "/login", icon: LogOutIcon }];

const AdminSidebar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await deleteAuthCookies();
    router.push("/login");
  };

  return (
    <div className="w-6/12 sm:w-3/12 p-5 hidden sm:flex flex-col h-screen border-r-2 bg-[#2C3E50] sticky top-0 ">
      <div className="rounded-xl flex flex-col h-full">
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavButton
              key={item.name}
              item={item}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
        <nav className="mt-auto">
          {navLogout.map((item) => (
            <div
              key={item.name}
              onClick={handleLogout}
            >
              {" "}
              <NavButton
                item={item}
                isActive={pathname === item.href}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

const NavButton: FC<NavButtonProps> = ({ item, isActive }) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? " text-[#E67E22] border-r-2 border-[#E67E22]"
          : "text-white hover:bg-[#E67E22] hover:text-white border-2 border-transparent",
      )}
    >
      <item.icon
        className={cn(
          "h-5 w-5 transition-colors duration-200",
          isActive ? "text-[#E67E22]" : "hover:text-white",
        )}
      />
      <span>{item.name}</span>
    </Link>
  );
};

export default AdminSidebar;
