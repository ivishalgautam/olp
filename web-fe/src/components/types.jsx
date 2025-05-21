import Image from "next/image";
import Link from "next/link";
import React from "react";
import { h2 } from "./ui/typography";
import { ChevronRight } from "lucide-react";

export default function Types() {
  return (
    <div className="bg-black">
      <div className="container p-6">
        <div className="mx-auto grid w-max grid-cols-1 gap-4 rounded-full border border-dashed border-primary p-4 px-20 sm:grid-cols-2 sm:gap-0 md:grid-cols-3">
          {[
            {
              image: "/genuine.png",
              label: (
                <h2 className={"border-none font-thin text-white lg:text-3xl"}>
                  <div className="font-bold">Genuine</div> Parts
                </h2>
              ),
              link: "/products?page=1&part=genuine",
            },
            {
              image: "/oem.png",
              label: (
                <h2 className={"border-none font-thin text-white lg:text-3xl"}>
                  <div className="font-bold">OEM</div> Parts
                </h2>
              ),
              link: "/products?page=1&part=oem",
            },
            {
              image: "/aftermarket.png",
              label: (
                <h2 className={"border-none font-thin text-white lg:text-3xl"}>
                  <div className="font-bold">Aftermarket</div> Parts
                </h2>
              ),
              link: "/products?page=1&part=aftermarket",
            },
          ].map((ele, ind) => (
            <div key={ind} className="flex items-center gap-2">
              <figure className="size-16 lg:size-24">
                <Image
                  src={ele.image}
                  width={200}
                  height={200}
                  alt={ele.label}
                  className="aspect-video h-full w-full object-contain object-center"
                />
              </figure>
              <div className="space-y-2">
                {ele.label}
                <Link
                  href={ele.link}
                  className="inline-flex rounded-full border border-primary px-2 text-sm text-primary transition-colors hover:bg-primary hover:text-black"
                >
                  <span>View All</span> <ChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
