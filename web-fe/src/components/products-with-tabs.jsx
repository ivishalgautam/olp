"use client";
import { useState } from "react";
import ProductCard from "./cards/product";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { cn } from "@/lib/utils";
import { P } from "./ui/typography";
import Spinner from "./Spinner";

const fetchProducts = async (type) => {
  const { data } = await http().get(
    `${endpoints.products.getAll}?type=${type}`,
  );
  return data;
};

export default function ProductsWithTabs() {
  const [activeTab, setActiveTab] = useState("oem");
  const { data, isLoading } = useQuery({
    queryKey: ["products", activeTab],
    queryFn: () => fetchProducts(activeTab),
    enabled: !!activeTab,
  });

  if (isLoading) return;

  return (
    <div className="container space-y-4 py-4">
      <ul className="flex items-center justify-start gap-4 border-b">
        {["oem", "genuine", "aftermarket"].map((item) => (
          <li
            key={item}
            className={cn(
              `cursor-pointer border-b-2 border-transparent px-2 py-3 text-sm font-semibold`,
              {
                "border-blue-500": item === activeTab && item === "oem",
                "border-lime-500": item === activeTab && item === "genuine",
                "border-red-500": item === activeTab && item === "aftermarket",
              },
            )}
          >
            <button className="uppercase" onClick={() => setActiveTab(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {isLoading && <Spinner />}
        {!data?.length ? (
          <P>Not found!</P>
        ) : (
          data
            ?.slice(0, 12)
            .map((product) => <ProductCard key={product.id} {...product} />)
        )}
      </div>
    </div>
  );
}
