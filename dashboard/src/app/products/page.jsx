"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/components/Modal";
import { ProductForm } from "@/components/Forms/product/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { isObject } from "@/utils/object";
import { useRouter, useSearchParams } from "next/navigation";

async function deleteProduct(data) {
  return http().delete(`${endpoints.products.getAll}/${data.id}`);
}

const fetchProducts = async (page, limit) => {
  return await http().get(
    `${endpoints.products.getAll}?page=${page}&limit=${limit}`
  );
};

export default function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page"))
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit"))
    : 10;
  const [type, setType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
  });

  function openModal() {
    setIsModal(true);
  }

  function closeModal() {
    setIsModal(false);
  }

  function handleNavigate(href) {
    router.push(href);
  }

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success("Product deleted.");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
    onError: (error) => {
      if (isObject(error)) {
        toast.error(error.message);
      } else {
        toast.error(error);
      }
    },
  });

  const handleDelete = async (data) => {
    deleteMutation.mutate(data);
  };

  async function publishProduct(productId, value) {
    try {
      const response = await http().put(
        `${endpoints.products.getAll}/${productId}`,
        { is_published: value }
      );
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.log(error);
    }
  }

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
        <Button asChild>
          <Link href={"/products/create"}>Create</Link>
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns(
            setType,
            openModal,
            setProductId,
            publishProduct,
            handleNavigate
          )}
          data={data?.data}
          totalPage={data?.total_page}
        />
      </div>

      {isModal && (
        <Modal onClose={closeModal} isOpen={isModal}>
          <ProductForm
            type={type}
            handleDelete={handleDelete}
            closeModal={closeModal}
            productId={productId}
            // filteredProducts={filteredProducts}
          />
        </Modal>
      )}
    </div>
  );
}
