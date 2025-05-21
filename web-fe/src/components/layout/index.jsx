"use client";
import { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useParams, usePathname, useRouter } from "next/navigation";
import { allRoutes } from "@/data/routes";
import { MainContext } from "@/store/context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogSignUpHomeForm } from "../forms/dialog-signup-home";
import Image from "next/image";
import DialogOtpHomeForm from "../forms/dialog-otp-home";

export default function Layout({ children }) {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [isModal, setIsModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams();
  const { user, isUserLoading } = useContext(MainContext);
  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/verify"
    ) {
      return;
    }
    // if (isUserLoading) return;

    // Find the current route in the AllRoutes array
    const currentRoute = allRoutes?.find(
      (route) => route.link === pathname.replace(slug, "[slug]"),
    );

    if (user && currentRoute?.roles?.length && !user?.is_verified)
      return router.push("/verify");

    // If the current route is not found in the array or the user's role is not allowed for this route
    if (
      currentRoute &&
      currentRoute.roles.length &&
      (!currentRoute || !currentRoute?.roles?.includes(user?.role))
    ) {
      localStorage.clear();
      router.replace("/login");
    }
  }, [pathname, user, isUserLoading, slug]);

  useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    return new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element",
    );
  };

  useEffect(() => {
    if (pathname === "/" && !user) {
      setTimeout(() => {
        setIsModal(true);
      }, 10 * 1000);
    }
  }, []);

  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <div className="h-full">{children}</div>
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
                <DialogOtpHomeForm phone={phone} setIsModal={setIsModal} />
              ) : (
                <DialogSignUpHomeForm
                  setIsOtpSent={setIsOtpSent}
                  setPhone={setPhone}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </main>
    </div>
  );
}
