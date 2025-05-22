"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { FaRegTrashCan } from "react-icons/fa6";

export default function RegistrationQueryForm({ handleDelete, id }) {
  const { register, setValue } = useForm();

  const fetchQueryById = async () => {
    return await http().get(`${endpoints.registrations.getAll}/${id}`);
  };

  const { data } = useQuery({
    queryFn: fetchQueryById,
    queryKey: [`registrations`, id],
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      console.log({ data });
      setValue("name", data?.data?.name);
      setValue("email", data?.data?.email);
      setValue("phone", data?.data?.phone);
      setValue("industry", data?.data?.industry);
    }
  }, [data, setValue]);

  return (
    <div className="space-y-4">
      <Title text={"Registration"} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* name */}
        <div>
          <Label>Name</Label>
          <Input
            disabled
            type="text"
            placeholder="Name"
            {...register("name", {
              required: "required",
            })}
          />
        </div>

        {/* email */}
        <div>
          <Label>Email</Label>
          <Input
            disabled
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "required",
            })}
          />
        </div>

        {/* phone */}
        <div>
          <Label>Phone</Label>
          <Input
            disabled
            placeholder="Phone"
            {...register("phone", {
              required: "required",
              valueAsNumber: true,
            })}
          />
        </div>

        {/* industry */}
        <div className="md:col-span-2">
          <Label>Industry</Label>
          <Input
            disabled
            placeholder="industry"
            {...register("industry", {
              required: "required",
            })}
          />
        </div>
      </div>

      <div>
        <Button
          variant="destructive"
          size="icon"
          type="button"
          onClick={() => handleDelete(id)}
        >
          <FaRegTrashCan />
        </Button>
      </div>
    </div>
  );
}
