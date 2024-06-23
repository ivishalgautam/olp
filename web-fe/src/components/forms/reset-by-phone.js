"use client";

import { useState } from "react";
import { H1, P } from "../ui/typography";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";
import { useForm } from "react-hook-form";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useRouter } from "next/navigation";
import { isObject } from "@/utils/object";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function reset(data) {
    setLoading(true);
    try {
      const response = await http().post(endpoints.auth.resetPassword, data);
      router.push("/");
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.message ?? "Unable to complete your request.");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (data) => {
    await reset(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex items-center justify-start p-8">
        <div className="w-full space-y-6">
          <div className="relative mb-8 before:absolute before:-bottom-5 before:left-0 before:h-1.5 before:w-20 before:bg-black">
            <H1>Reset password</H1>
          </div>

          {/* username */}
          <div>
            <Label>Phone</Label>
            <Input
              {...register("phone", {
                required: "required",
              })}
              placeholder="Enter your phone number"
              className="mt-2 rounded-full bg-gray-100 px-4 py-6"
            />
          </div>

          <div>
            <Button className="rounded-full px-12 py-6">
              {loading && (
                <span className="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white/30 border-t-white"></span>
              )}
              Reset
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
