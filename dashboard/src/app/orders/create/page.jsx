"use client";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import Title from "@/components/Title";
import { useFetchProducts } from "@/hooks/useFetchProducts";
import ProductCard from "@/components/cards/Product";
import { toast } from "sonner";
import { endpoints } from "../../../utils/endpoints";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.temp}`, data);
};

export default function Create() {
  const { data: products } = useFetchProducts();

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

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input space-y-4">
      <div className="p-2">
        <Title text={"Products"} />
      </div>

      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {products?.map((prd) => (
            <ProductCard
              key={prd.id}
              {...prd}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
