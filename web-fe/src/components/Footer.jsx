import { IoMdPaperPlane } from "react-icons/io";
import { H4, P } from "./ui/typography";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { LucideMailOpen, Search } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <div className="bg-primary">
        <div className="container py-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-0">
            <div className="col-span-3 flex items-center justify-start gap-4 text-secondary">
              <LucideMailOpen size={70} />
              <H4>Sign up to Newsletter</H4>
            </div>

            <div className="col-span-2 flex items-center justify-center">
              <div className="flex items-center justify-start rounded-l-full bg-white/60 pl-3">
                <Search />
                <Input
                  placeholder="Enter your email"
                  className="rounded-l-full bg-transparent"
                />
              </div>
              <Button variant="secondary" className="rounded-r-full text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="divide-y-2 divide-gray-600 bg-secondary">
        <div className="container py-16">
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-6 rounded-lg bg-primary p-4 md:col-span-3 lg:col-span-2">
              <div>
                <figure>
                  <Image
                    src={"/logo.png"}
                    width={100}
                    height={100}
                    alt="logo"
                  />
                </figure>

                <div className="mt-2 space-y-2 text-sm">
                  <p className={"leading-6"}>
                    <span className="font-semibold">Registered Address:</span>{" "}
                    300D, Bhoor Colony, Near Lal Mandir, Sector 29, Old
                    Faridabad-121008, Haryana, INDIA
                  </p>
                  <p className={"leading-6"}>
                    <span className="font-semibold">Warehouse Address:</span>{" "}
                    Near Paramdham Mandir, Badkhal Extension, Faridabad Gurgaon
                    Road, Faridabad-121001, Haryana, INDIA
                  </p>
                  <p className={"leading-6"}>
                    <span className="font-semibold">Phone:</span> +91 9811632400
                  </p>
                  <p className={"leading-6"}>
                    <span className="font-semibold">Email:</span>{" "}
                    sales@onlineparts.in
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-6 grid grid-cols-4 gap-8 md:col-span-3 lg:col-span-4">
              <div className="col-span-2 text-white md:col-span-2 lg:col-span-1">
                <H4>Quick links</H4>
                <ul className="mt-6 space-y-4">
                  {["home", "about", "products", "blogs", "contact"].map(
                    (item) => (
                      <li
                        key={item}
                        className="transition-transform hover:translate-x-1"
                      >
                        <Link
                          href={
                            item === "home"
                              ? "/"
                              : item === "about"
                                ? ""
                                : `/${item}`
                          }
                          className="text-sm capitalize"
                        >
                          {item}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div className="col-span-2 text-white md:col-span-2 lg:col-span-1">
                <H4>Information</H4>
                <ul className="mt-6 space-y-4">
                  {["aftermarket", "OEM", "genuine"].map((item) => (
                    <li
                      key={item}
                      className="transition-transform hover:translate-x-1"
                    >
                      <Link
                        href={`/products?part=${item.toLowerCase()}`}
                        className="text-sm capitalize"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-4 text-white md:col-span-4 lg:col-span-2">
                <H4>Follow Us</H4>
                <div className="mt-4 space-x-2">
                  <Button
                    size="icon"
                    className="rounded-sm bg-black transition-transform hover:-translate-y-1"
                  >
                    <a
                      href="https://www.facebook.com/onlinepartsearthmoving"
                      target="_blank"
                    >
                      <FaFacebookF size={20} />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-sm bg-black transition-transform hover:-translate-y-1"
                  >
                    <a
                      href="https://www.instagram.com/onlineparts.shop/"
                      target="_blank"
                    >
                      <FaInstagram size={20} />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    className="rounded-sm bg-black transition-transform hover:-translate-y-1"
                  >
                    <a
                      href="https://www.linkedin.com/company/online-parts/"
                      target="_blank"
                    >
                      <FaLinkedinIn size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="container flex items-center justify-between py-3 text-sm text-gray-400">
          <span>
            Copyright © {new Date().getFullYear()} by Onlineparts.shop
          </span>
          <span>All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
