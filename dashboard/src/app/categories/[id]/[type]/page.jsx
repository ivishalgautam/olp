"use client";
import { CategoryForm } from "@/components/Forms/Category";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

async function updateCategory(data) {
  return http().put(`${endpoints.categories.getAll}/${data.id}`, data);
}

export default function Page({ params: { id, type } }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const updateMutation = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success("Category updated.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/categories");
    },
    onError: (error) => {
      toast(error.message ?? "error");
    },
  });

  const handleUpdate = async (data) => {
    updateMutation.mutate({ ...data, id: id });
  };

  return (
    <div className="container mx-auto space-y-4 overflow-y-auto pb-10">
      <CategoryForm type={type} handleUpdate={handleUpdate} categoryId={id} />
    </div>
  );
}
