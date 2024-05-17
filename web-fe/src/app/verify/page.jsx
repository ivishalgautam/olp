"use client";
import OTPForm from "@/components/forms/otp";
import AuthLayout from "@/components/layout/auth-layout";
import { MainContext } from "@/store/context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Verify() {
  const router = useRouter();
  const { user } = useContext(MainContext);
  if (!user) return router.replace("/login");
  return (
    <AuthLayout>
      <OTPForm phone={user.mobile_number} />
    </AuthLayout>
  );
}
