"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./cards/blog";
import Spinner from "./Spinner";
import { useContext, useEffect, useState } from "react";
import DialogSignUpBlogForm from "./forms/dialog-signup-blog";
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
import { Button } from "./ui/button";
import { X } from "lucide-react";

async function fetchBlogs() {
  return await http().get(`${endpoints.blogs.getAll}?featured=true`);
}

export default function Blogs() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });
  const [isModal, setIsModal] = useState(false);
  const pathname = usePathname();
  const { user, isUserLoading } = useContext(MainContext);

  useEffect(() => {
    if (pathname === "/blogs") {
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
          <div className="relative p-6">
            <Button
              type="button"
              size="icon"
              className="absolute left-4 top-16 z-10 rounded-full bg-white p-2 text-black"
              onClick={() => setIsModal(false)}
            >
              <X size={15} />
            </Button>

            <Image
              src={"/03.jpg"}
              width={200}
              height={200}
              alt="signup"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <DialogSignUpBlogForm setIsModal={setIsModal} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
