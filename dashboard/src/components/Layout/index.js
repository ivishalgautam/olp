"use client";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.href = "/login";
  }
  redirect("/login");
};

const Layout = ({ children }) => {
  return (
    <div className="relative overflow-hidden h-screen">
      <div className="flex h-full">
        <Sidebar />
        <div className="overflow-scroll overflow-x-hidden w-full p-8 pb-20 h-full bg-gray-100">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
