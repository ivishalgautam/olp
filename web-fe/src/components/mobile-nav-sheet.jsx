"use client";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { useContext } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BrowseCategory from "./browse-category";
import Search from "./Search";
import { navList } from "./Navbar";
import Link from "next/link";
import { FaPhone } from "react-icons/fa";
import { MainContext } from "@/store/context";
import { Menu } from "lucide-react";

export default function MobileNavSheet() {
  const { user } = useContext(MainContext);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-primary p-0 lg:hidden">
        <SheetHeader>
          <div className="flex items-center justify-between bg-white p-4">
            <Image width={100} height={100} src={"/logo.png"} alt="logo" />
          </div>
        </SheetHeader>
        <div className="grid divide-y-2 divide-primary-foreground p-4 py-4">
          <div className="py-6">
            <Search />
          </div>
          <div className="py-6">
            <BrowseCategory />
          </div>
          <nav>
            <ul className="flex flex-col items-start justify-center divide-y-2 divide-primary-foreground">
              {navList.map(({ title, href }) => (
                <li className="w-full py-4" key={title}>
                  <Link
                    href={href}
                    className="h-full w-full text-sm font-semibold text-white"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-6 text-sm font-medium text-white">
            <Link href={user ? "/customer/overview" : "/login"}>
              {user
                ? `${user?.first_name} ${user?.last_name}`
                : "Log In / Sign Up"}
            </Link>
            <div className="mt-4 flex items-center justify-start gap-2">
              <FaPhone />
              <span>+91 9811632400</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
