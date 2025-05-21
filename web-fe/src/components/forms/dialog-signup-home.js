"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { FaRegEye } from "react-icons/fa";
import { toast } from "sonner";
import ReactSelect from "react-select";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { H1, P } from "../ui/typography";
import { countries } from "@/data/countryCodes";

async function createCustomer(data) {
  return http().post(endpoints.users.getAll, data);
}

export function DialogSignUpHomeForm({ setIsOtpSent, setPhone }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    cpassword: false,
  });

  const createMutation = useMutation(createCustomer, {
    onSuccess: () => {
      setIsOtpSent(true);
      reset();
    },
    onError: (error) => {
      toast.error(error?.message ?? "Error registering customer!");
    },
  });

  const handleCreate = async (data) => {
    createMutation.mutate(data);
  };

  const onSubmit = (data) => {
    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      country_code: data.country_code.value,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    handleCreate(payload);
    setPhone(payload.mobile_number);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-4xl rounded-xl bg-primary/90 p-8 shadow-lg">
        {/* 10% OFF Badge */}
        <div className="absolute -right-8 -top-8 flex size-24 flex-col items-center justify-center rounded-full bg-secondary font-bold text-primary shadow-md">
          <span className="text-4xl">10%</span>
          <span className="-mt-1 text-sm">OFF</span>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-secondary">
          Sign Up for Exclusive Offers!
        </h2>
        <p className="mb-6 max-w-lg text-secondary">
          Join our community and get the latest updates, discounts, and expert
          tips delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6"
          autocomplete="off"
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="col-span-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                placeholder="Email"
                autocomplete="off"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
              />
              {errors.email && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                type="text"
                placeholder="FirstName"
                autocomplete="off"
                {...register("first_name", { required: "required" })}
                className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
              />
              {errors.first_name && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                type="text"
                placeholder="Lastname"
                autocomplete="off"
                {...register("last_name")}
                className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
              />
            </div>

            <div>
              <Label htmlFor="country_code">Country code</Label>
              <Controller
                control={control}
                name="country_code"
                rules={{ required: "required" }}
                render={({ field }) => (
                  <ReactSelect
                    onChange={field.onChange}
                    value={field.value}
                    options={countries.map(({ code: value, name }) => ({
                      value,
                      label: `${value} ${name}`,
                    }))}
                    placeholder="Country"
                    autocomplete="off"
                    classNames={{
                      control: () =>
                        "border-2 border-amber-300 bg-amber-200/50 text-secondary",
                    }}
                  />
                )}
              />
              {errors.country_code && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.country_code.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="mobile_number">Mobile number</Label>
              <Input
                {...register("mobile_number", { required: "required" })}
                placeholder="Enter mobile number"
                autocomplete="off"
                className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
              />
              {errors.mobile_number && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.mobile_number.message}
                </span>
              )}
            </div>

            <div className="col-span-full">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                placeholder="Username"
                autocomplete="off"
                {...register("username", {
                  required: "required",
                  pattern: {
                    value: /^[a-z0-9]{3,16}$/,
                    message:
                      "Username should only contain lowercase letters. e.g. john",
                  },
                })}
                className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
              />
              {errors.username && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.password ? "text" : "password"}
                  placeholder="Password"
                  autocomplete="off"
                  {...register("password", { required: "required" })}
                  className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 pr-10 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-secondary"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                >
                  <FaRegEye />
                </div>
              </div>
              {errors.password && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="confirm_password">Confirm password</Label>
              <div className="relative">
                <Input
                  type={showPasswords.cpassword ? "text" : "password"}
                  placeholder="Confirm password"
                  autocomplete="off"
                  {...register("confirm_password", {
                    required: "required",
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Your passwords do not match";
                      }
                    },
                  })}
                  className="w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 pr-10 text-secondary placeholder-secondary/60 focus:border-secondary focus:outline-none"
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-secondary"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      cpassword: !prev.cpassword,
                    }))
                  }
                >
                  <FaRegEye />
                </div>
              </div>
              {errors.confirm_password && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.confirm_password.message}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="ghost"
              className="w-full rounded-md bg-secondary px-4 py-3 font-semibold text-white transition-colors hover:bg-secondary/80 hover:text-white"
            >
              Sign Me Up & Stay Updated
            </Button>
            <p className="text-sm">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
