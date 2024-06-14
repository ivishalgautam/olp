"use client";
import Title from "@/components/Title";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useMutation, useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { endpoints } from "@/utils/endpoints";

const fetchProducts = async (page, limit) => {
  return await http().get(
    `${endpoints.products.getAll}?page=${page}&limit=${limit}`
  );
};

const addToCart = (data) => {
  return http().post(`${endpoints.cart.temp}`, data);
};

export default function Products() {
  return (
    <Suspense>
      <Table />
    </Suspense>
  );
}
function Table() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit"))
    : 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
  });

  function handleNavigate(href) {
    router.push(href);
  }

  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddToCart = async (data) => {
    createMutation.mutate(data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return JSON.stringify(error);
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Products"} />
      </div>

      <div>
        <DataTable
          columns={columns(handleAddToCart, handleNavigate)}
          data={data?.data}
          totalPage={data?.total_page}
        />
      </div>
    </div>
  );
}
