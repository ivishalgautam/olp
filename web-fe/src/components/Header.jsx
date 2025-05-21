"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import Navbar from "./Navbar";
import { MainContext } from "@/store/context";
import Search from "./Search";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { Button, buttonVariants } from "./ui/button";
import BrowseCategory from "./browse-category";
import Hero from "./Hero";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.temp);
  return data;
};

export const navList = [
  { title: "Home", href: "/" },
  { title: "About", href: "" },
  { title: "Products", href: "/products?page=1" },
  { title: "Blogs", href: "/blogs" },
  { title: "Contact", href: "/contact" },
];

export default function Header() {
  const { user } = useContext(MainContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart-items"],
    enabled: !!user,
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <div
        className={cn(
          "fixed left-0 top-0 z-50 w-full bg-primary transition-colors duration-300",
          {
            "bg-transparent": pathname === "/",
            "bg-primary shadow-md": scrolled,
          },
        )}
      >
        <div className="container relative z-50 min-h-16">
          <div className="flex items-center justify-start gap-6 py-6">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image
                width={100}
                height={100}
                src="/logo.png"
                alt="logo"
                className="h-20 w-auto object-contain object-center"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-10 lg:flex">
              <nav className="space-y-2">
                <ul className="flex gap-6 text-black">
                  {navList.map(({ title, href }) => (
                    <li key={title}>
                      <Link href={href} className="text-sm font-semibold">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <BrowseCategory />
              </nav>
            </div>

            {/* Search - desktop only */}
            <div className="mx-4 hidden w-full max-w-sm lg:block">
              <Search />
            </div>

            {/* User actions */}
            <div className="ml-auto flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/cart" className="relative">
                    {data?.length > 0 && (
                      <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {data.length}
                      </span>
                    )}
                    <MdOutlineShoppingCart
                      size={28}
                      color={scrolled ? "#000" : "#fff"}
                    />
                  </Link>
                  <Link href="/customer/overview">
                    <FiUser size={28} color={scrolled ? "#000" : "#fff"} />
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Login
                </Link>
              )}

              <div className="hidden items-center lg:flex">
                <figure className="size-10">
                  <Image
                    src={"/whatsapp-icon.png"}
                    alt="whatsapp"
                    width={50}
                    height={50}
                    className="h-full w-full "
                  />
                </figure>
                <div className="rounded-r-full bg-primary px-3 py-0.5 pl-1 text-sm font-semibold">
                  +91 9811632400
                </div>
              </div>
            </div>
            <div
              id="google_translate_element"
              className="absolute bottom-2 right-0"
            ></div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 lg:hidden"
            >
              <svg
                className="h-6 w-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute left-0 top-full flex w-full flex-col gap-4 bg-primary px-4 py-6 lg:hidden">
              <Search />
              <nav>
                <ul className="flex flex-col gap-4 text-black">
                  {navList.map(({ title, href }) => (
                    <li key={title}>
                      <Link href={href} className="text-sm font-semibold">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <BrowseCategory />

              <div className="flex items-center">
                <figure className="size-10">
                  <Image
                    src={"/whatsapp-icon.png"}
                    alt="whatsapp"
                    width={50}
                    height={50}
                    className="h-full w-full "
                  />
                </figure>
                <div className="rounded-r-full bg-primary px-3 py-0.5 pl-1 text-sm font-semibold">
                  +91 9811632400
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
