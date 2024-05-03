"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuBarChartHorizontal } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Spinner from "./Spinner";
import { ScrollArea } from "./ui/scroll-area";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export const fetchCategories = async () => {
  const { data } = await http().get(endpoints.categories.getAll);
  return data;
};

export default function BrowseCategory() {
  const pathname = usePathname();
  const [isCategory, setIsCategory] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !!isCategory,
  });

  useEffect(() => {
    return () => {
      setIsCategory(false);
    };
  }, [pathname]);

  return (
    <div className="relative z-30">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger onMouseOver={() => setIsCategory(true)}>
              <span>Browse categories</span>
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <ul className="relative grid w-[350px] grid-cols-2 gap-3 p-6 md:w-[400px] md:grid-cols-3 lg:w-[500px]">
                {data?.map((cat) => (
                  <li key={cat.id} className="">
                    <NavigationMenuLink asChild>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="text-sm capitalize text-gray-700 transition-colors hover:text-primary"
                      >
                        {cat.name}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
