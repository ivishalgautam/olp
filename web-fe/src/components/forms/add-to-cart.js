"use client";
import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { MainContext } from "@/store/context";
import { Button } from "../ui/button";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}/temp-cart`, data);
};

export default function AddToCart({ id }) {
  const { user } = useContext(MainContext);
  const queryClient = useQueryClient();
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("cart-items");
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddTocart = async (id) => {
    if (!user) return toast.warning("Please login first");
    createMutation.mutate({ product_id: id });
  };
  return (
    <Button
      variant="primary"
      className="rounded-full"
      onClick={() => handleAddTocart(id)}
    >
      Add to cart
    </Button>
  );
}
