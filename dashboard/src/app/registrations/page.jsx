"use client";
import Title from "@/components/Title";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Modal from "@/components/Modal";
import { useState } from "react";
import QueryForm from "@/components/Forms/Query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "../../utils/endpoints.js";
import Spinner from "@/components/Spinner";
import { isObject } from "@/utils/object";
import { toast } from "sonner";
import RegistrationQueryForm from "@/components/Forms/registration-query";

async function deleteRegistration({ id }) {
  return http().delete(`${endpoints.registrations.getAll}/${id}`);
}

async function fetchRegistration() {
  return http().get(endpoints.registrations.getAll);
}

export default function Registrations() {
  const [isModal, setIsModal] = useState(false);
  const [id, setId] = useState(null);
  const queryClient = useQueryClient();

  function openModal() {
    setIsModal(true);
  }
  function closeModal() {
    setIsModal(false);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchRegistration,
    queryKey: ["registrations"],
  });

  const deleteMutation = useMutation(deleteRegistration, {
    onSuccess: () => {
      toast.success("Registration deleted.");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
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

  const handleDelete = async (id) => {
    deleteMutation.mutate({ id });
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
        <Title text={"registrations"} />
      </div>
      <div>
        <DataTable columns={columns(openModal, setId)} data={data?.data} />
      </div>

      {isModal && (
        <Modal isOpen={isModal} onClose={closeModal}>
          <RegistrationQueryForm handleDelete={handleDelete} id={id} />
        </Modal>
      )}
    </div>
  );
}
