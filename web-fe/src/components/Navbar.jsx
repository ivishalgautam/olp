"use client";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineLocalPhone, MdOutlineShoppingCart } from "react-icons/md";
import { redirect } from "next/navigation";
import { RiUser3Line } from "react-icons/ri";
import BrowseCategory from "./browse-category";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { MainContext } from "@/store/context";
import MobileNavSheet from "./mobile-nav-sheet";

export const navList = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Products", href: "/products?page=1" },
  { title: "Contact", href: "/contact" },
];

const fetchTempCart = () => {
  return http().get(endpoints.cart.temp);
};

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.href = "/login";
  }
  redirect("/login");
}

export default function Navbar() {
  const { user } = useContext(MainContext);
  const { data, isFetching } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart"],
    enabled: !!user,
  });

  return (
    <div className="flex items-center justify-center bg-primary md:h-16">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="p-4 md:hidden">
            <Image width={100} height={100} src={"/logo.png"} alt="logo" />
          </div>
          <div className="hidden md:block">
            <BrowseCategory />
          </div>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              {navList.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm font-semibold text-white"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:block">
            <button className="flex items-center justify-center gap-2 text-white">
              <MdOutlineLocalPhone />
              <span className="text-sm">Whatsapp</span>
              <span className="text-lg font-bold">+91 9811632400</span>
            </button>
          </div>

          <div className="flex items-center justify-end gap-2 md:hidden">
            <div className="flex items-center justify-center">
              {user && (
                <div>
                  <Link
                    href={"/cart"}
                    className="inline-block rounded-sm p-2 transition-colors hover:bg-black/10"
                  >
                    <span>{data?.length}</span>
                    <MdOutlineShoppingCart size={25} fill="#fff" />
                  </Link>
                  <Link
                    href={"/customer/overview"}
                    className="inline-block rounded-sm p-2 transition-colors hover:bg-black/10"
                  >
                    <RiUser3Line size={25} fill="#fff" />
                  </Link>
                </div>
              )}
              <MobileNavSheet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
