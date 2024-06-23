import ChangePasswordForm from "@/components/forms/change-password";
import AuthLayout from "@/components/layout/auth-layout";
import React from "react";

export default function Page({ params: { token } }) {
  return (
    <AuthLayout>
      <ChangePasswordForm token={token} />
    </AuthLayout>
  );
}
