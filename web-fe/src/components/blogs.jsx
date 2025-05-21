"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./cards/blog";
import Spinner from "./Spinner";
import { useContext, useEffect, useState } from "react";
import DialogOtpBlogForm from "./forms/dialog-otp-blog";
import { DialogSignUpBlogForm } from "./forms/dialog-signup-blog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { usePathname } from "next/navigation";
import { MainContext } from "@/store/context";
import Image from "next/image";

async function fetchBlogs() {
  return await http().get(`${endpoints.blogs.getAll}?featured=true`);
}

export default function Blogs() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [isModal, setIsModal] = useState(false);
  const pathname = usePathname();
  const { user, isUserLoading } = useContext(MainContext);

  useEffect(() => {
    if (pathname === "/blogs" && !user) {
      setTimeout(() => {
        setIsModal(true);
      }, 10 * 1000);
    }
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
      <Dialog open={isModal} onOpenChange={setIsModal}>
        <DialogTrigger className="sr-only">Open</DialogTrigger>
        <DialogContent className="max-w-2xl p-0">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign up form?</DialogTitle>
            <DialogDescription className="sr-only">
              Sign up form.
            </DialogDescription>
          </DialogHeader>
          <div className="relative p-8">
            <Image
              src={"/03.jpg"}
              width={200}
              height={200}
              alt="signup"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {isOtpSent ? (
              <DialogOtpBlogForm phone={phone} setIsModal={setIsModal} />
            ) : (
              <DialogSignUpBlogForm
                setIsOtpSent={setIsOtpSent}
                setPhone={setPhone}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
