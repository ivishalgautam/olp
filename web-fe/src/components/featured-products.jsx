"use client";
import ProductCard from "./cards/product";
import { H3, P } from "./ui/typography";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const fetchProducts = async () => {
  const { data } = await http().get(
    `${endpoints.products.getAll}?featured=true`,
  );
  return data;
};

export default function FeaturedProducts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Spinner />;
  if (isError) return error.message ?? "error";
  // console.log({ products: data });
  return (
    <div className="container space-y-4 py-4">
      <H3 className={"border-b pb-4"}>
        <span className="border-b-2 border-primary py-3">Featured </span>
        products
      </H3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {!data?.length ? (
          <P>Not found!</P>
        ) : (
          data
            ?.slice(0, 12)
            ?.map((product) => <ProductCard key={product.id} {...product} />)
        )}
      </div>
    </div>
  );
}
