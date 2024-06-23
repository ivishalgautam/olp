"use client";
import LoginForm from "@/components/forms/login";
import ResetPasswordForm from "@/components/forms/reset-by-phone";
import AuthLayout from "@/components/layout/auth-layout";
import { useState } from "react";

export default function Page() {
  const [isResetPassword, setIsResetPassword] = useState(false);
  return (
    <AuthLayout>
      {isResetPassword ? (
        <ResetPasswordForm />
      ) : (
        <LoginForm setIsResetPassword={setIsResetPassword} />
      )}
    </AuthLayout>
  );
}
