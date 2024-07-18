"use client";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { H1, P } from "../ui/typography";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { FaRegEye } from "react-icons/fa";
import { toast } from "sonner";
import ReactSelect from "react-select";
import Link from "next/link";

import "react-phone-number-input/style.css";
import { countries } from "@/data/countryCodes";
import { Label } from "../ui/label";

async function createCustomer(data) {
  return http().post(endpoints.users.getAll, data);
}

export function SignUpForm({ setIsOtpSent, setPhone }) {
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
    onSuccess: (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl">
      <div className="flex items-center justify-start p-8">
        <div className="w-full space-y-6">
          <div className="space-y-4">
            {/* title */}
            <div className="">
              <H1>Sign Up</H1>
            </div>

            {/* product info */}
            <div className="space-y-4 rounded-lg border-input bg-white">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* first name */}
                <div>
                  <Label htmlFor="first_name">Firstname</Label>
                  <Input
                    type="text"
                    placeholder="FirstName"
                    {...register("first_name", {
                      required: "required",
                    })}
                  />
                  {errors.first_name && (
                    <span className="text-red-600">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>

                {/* last name */}
                <div>
                  <Label htmlFor="last_name">Lastname</Label>
                  <Input
                    type="text"
                    placeholder="Lastname"
                    {...register("last_name")}
                  />
                </div>

                {/* country code */}
                <div>
                  <Label htmlFor="country_code">Country code</Label>
                  <Controller
                    control={control}
                    rules={{ required: "required" }}
                    name="country_code"
                    render={({ field }) => (
                      <ReactSelect
                        onChange={field.onChange}
                        value={field.value}
                        options={countries.map(({ code: value, name }) => ({
                          value,
                          label: `${value} ${name}`,
                        }))}
                        placeholder="Country"
                      />
                    )}
                  />
                  {errors.country_code && (
                    <span className="text-red-600">
                      {errors.country_code.message}
                    </span>
                  )}
                </div>

                {/* mobile number */}
                <div>
                  <Label htmlFor="mobile_number">Mobile number</Label>
                  <Input
                    {...register("mobile_number", {
                      required: "required",
                    })}
                    placeholder="Enter mobile number"
                  />
                  {errors.mobile_number && (
                    <span className="text-red-600">
                      {errors.mobile_number.message}
                    </span>
                  )}
                </div>

                {/* email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                  )}
                </div>

                {/* username */}
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "required",
                      pattern: {
                        value: /^[a-z0-9]{3,16}$/,
                        message:
                          "Username should only contain lowercase letters. e.g. john",
                      },
                    })}
                    // pattern="/^[a-z0-9]{3,16}$/"
                  />
                  {errors.username && (
                    <span className="text-red-600">
                      {errors.username.message}
                    </span>
                  )}
                </div>

                {/* passwords */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.password ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "required",
                      })}
                    />
                    <div
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* confirm password */}
                <div className="relative">
                  <Label htmlFor="confirm_password">Confirm password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.cpassword ? "text" : "password"}
                      placeholder="Confirm password"
                      {...register("confirm_password", {
                        required: "required",
                        validate: (val) => {
                          if (watch("password") != val) {
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
                  {errors.confirm_password && (
                    <span className="text-red-600">
                      {errors.confirm_password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* submit */}
          <div className="text-right">
            <Button variant={"primary"}>Register</Button>
          </div>

          <div className="translate-y-4">
            <P className={"text-center text-sm font-medium tracking-wide"}>
              Already have an account?{" "}
              <Link href={"/login"} className="text-primary">
                Login
              </Link>
            </P>
          </div>
        </div>
      </div>
    </form>
  );
}
