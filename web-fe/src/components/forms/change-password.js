"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { H1, H4 } from "../ui/typography";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";

const changePassword = async (data) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await axios.put(
    `${baseUrl}${endpoints.auth.resetPassword}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
  return response.data;
};

export default function ChangePasswordForm({ token }) {
  const [showPasswords, setShowPasswords] = useState({
    new_password: false,
    cpassword: false,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const resetMutation = useMutation(changePassword, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success(data.message ?? "Password changed");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(
        error.response.data.message ?? "Reset password link expired!",
      );
    },
  });

  const onSubmit = (data) => {
    const payload = {
      token: token,
      new_password: data.new_password,
    };

    console.log({ data, payload });

    handleUpdate(payload);
  };

  function handleUpdate(data) {
    resetMutation.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-4 rounded-lg p-4">
        <H1>Change password</H1>

        <div className="space-y-2">
          {/* new password */}
          <div className="relative">
            <Label htmlFor="new_password">New password</Label>
            <div className="relative">
              <Input
                type={showPasswords.new_password ? "text" : "password"}
                placeholder="New password"
                {...register("new_password", {
                  required: "required",
                })}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    new_password: !showPasswords.new_password,
                  }))
                }
              >
                <FaRegEye />
              </div>
            </div>
            {errors.new_password && (
              <span className="text-red-600">
                {errors.new_password.message}
              </span>
            )}
          </div>

          {/* confirm password */}
          <div className="relative">
            <Label htmlFor="cpassword">Confirm password</Label>
            <div className="relative">
              <Input
                type={showPasswords.cpassword ? "text" : "password"}
                placeholder="Confirm password"
                {...register("cpassword", {
                  required: "required",
                  validate: (val) => {
                    if (watch("new_password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    cpassword: !showPasswords.cpassword,
                  }))
                }
              >
                <FaRegEye />
              </div>
            </div>
            {errors.cpassword && (
              <span className="text-red-600">{errors.cpassword.message}</span>
            )}
          </div>
        </div>

        {/* button */}
        <Button>Change password</Button>
      </div>
    </form>
  );
}
