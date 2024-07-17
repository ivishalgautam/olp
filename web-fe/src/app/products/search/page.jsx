"use client";
import ProductCard from "@/components/cards/product";
import { H4 } from "@/components/ui/typography";
import { searchProducts } from "@/hooks/useSearchProducts";
import React, { useEffect, useState } from "react";

export default function Page({ searchParams: { q } }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleSearch = async (value) => {
      if (!value.trim()) return setSearchResults([]);
      const searchQuery = value.replace(/\s+/g, "-");
      const results = await searchProducts(searchQuery);
      setSearchResults(results);
    };
    handleSearch(q);
  }, [q]);

  return (
    <section className="py-6">
      <div className="container space-y-8">
        <H4>Search result for: &apos;{q}&apos;</H4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {searchResults?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
