"use client";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import { toast } from "sonner";
import { CustomerForm } from "../../components/Forms/Customer.js";
import { useRouter } from "next/navigation";

async function deleteCustomer(data) {
  return http().delete(`${endpoints.users.getAll}/${data.id}`);
}

const fetchCustomers = async () => {
  const { data } = await http().get(endpoints.users.getAll);
  return data;
};

async function updateCustomerStatus({ id, status }) {
  return await http().put(`${endpoints.users.getAll}/status/${id}`, {
    is_active: status,
  });
}

export default function Customers() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [type, setType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchCustomers,
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

  const { mutate: handleCustomerStatus } = useMutation(updateCustomerStatus, {
    onMutate: async (data) => {
      console.log({ data });
      queryClient.setQueryData(["users"], (old) => {
        return old.map((item) => {
          if (item.id === data.id) {
            return { ...item, is_active: data.status };
          }
          return item;
        });
      });
    },
    onSuccess: (resp) => {
      toast.success(resp.message);
    },
    onError: async (error, variables, context) => {
      console.log({ error });
      toast.error(error.message ?? "error");
      queryClient.setQueryData(["users"], (old) => {
        return old.map((item) => {
          if (item.id === variables.id) {
            return { ...item, is_active: !variables.status };
          }
          return item;
        });
      });
    },
  });

  const deleteMutation = useMutation(deleteCustomer, {
    onSuccess: () => {
      toast.success("Customer deleted.");
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message ?? "error");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: true });
    },
  });

  const handleDelete = async (data) => {
    deleteMutation.mutate(data);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return error?.message ?? "error";
  }

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-center justify-between">
        <Title text={"Customers"} />
        <Button asChild>
          <Link href={"/customers/create"}>Create</Link>
        </Button>
      </div>

      <div>
        <DataTable
          columns={columns(
            setType,
            openModal,
            setCustomerId,
            handleCustomerStatus,
            handleNavigate
          )}
          data={data}
        />
      </div>

      {isModal && (
        <Modal onClose={closeModal} isOpen={isModal}>
          <CustomerForm
            type={type}
            handleDelete={handleDelete}
            closeModal={closeModal}
            customerId={customerId}
          />
        </Modal>
      )}
    </div>
  );
}
