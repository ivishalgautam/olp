"use client";

import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/input";

const createRegistration = async (data) => {
  return await http().post(endpoints.registrations.getAll, data);
};

export default function DialogSignUpHomeForm({ setIsModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const createMutation = useMutation(createRegistration, {
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setIsModal(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    createMutation.mutate(data);
  };

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Retail",
    "Manufacturing",
    "Other",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-amber-400 p-6 shadow-lg">
        {/* 10% OFF Badge */}
        <div className="absolute -right-10 -top-10 flex size-20 flex-col items-center justify-center rounded-full bg-blue-900 font-bold text-amber-400 md:size-24">
          <span className="text-2xl">10%</span>
          <span className="-mt-1 text-sm">OFF</span>
        </div>

        <h2 className="mb-2 text-lg font-bold text-blue-900 md:text-2xl">
          Sign Up for Exclusive Offers!
        </h2>
        <p className="mb-2 text-sm text-blue-900 md:text-base">
          Join our community and get the latest updates, discounts, and expert
          tips delivered straight to our inbox.
        </p>

        <ul className="mb-4 text-sm text-blue-900 md:text-base">
          <li className="flex items-start">
            <span className="mr-2">•</span> Exclusive discounts and offers
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span> Early access to new products
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span> Expert tips and resources
          </li>
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                className={`w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-blue-900 placeholder-blue-900/60 focus:border-blue-900 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="text"
                placeholder="Name"
                className={`w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-blue-900 placeholder-blue-900/60 focus:border-blue-900 focus:outline-none ${errors.name ? "border-red-500" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-4 sm:flex sm:gap-4 sm:space-y-0">
              <div className="flex-1">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full rounded-md border-2 border-amber-300 bg-amber-200/50 p-3 text-blue-900 placeholder-blue-900/60 focus:border-blue-900 focus:outline-none ${errors.phone ? "border-red-500" : ""}`}
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9+-\s()]*$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="relative flex-1">
                <select
                  className={`w-full appearance-none rounded-md border-2 border-amber-300 bg-amber-200/50 p-2 text-blue-900 placeholder-blue-900/60 focus:border-blue-900 focus:outline-none ${errors.industry ? "border-red-500" : ""}`}
                  {...register("industry")}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Industry Type
                  </option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-900"
                  size={18}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createMutation.isLoading}
              className="w-full rounded-md bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800"
            >
              {createMutation.isLoading
                ? "Signing Up..."
                : "Sign Me Up & Stay Updated"}
            </button>

            <p className="mt-2 text-center text-xs text-blue-900/80">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
