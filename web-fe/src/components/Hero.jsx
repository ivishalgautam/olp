import { CiGlobe } from "react-icons/ci";
import { Button } from "./ui/button";
import { FaTruckFast } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[90dvh] pt-40">
      <div className="absolute bottom-8 right-8 z-10 hidden items-center lg:flex">
        <figure className="size-10">
          <Image
            src={"/whatsapp-icon.png"}
            alt="whatsapp"
            width={50}
            height={50}
            className="h-full w-full "
          />
        </figure>
        <div className="rounded-r-full bg-black px-3 py-0.5 pl-1 text-sm font-semibold text-white">
          +91 9811632400
        </div>
      </div>
      <div className="container">
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-r from-primary from-85% to-transparent md:w-[60%]"></div>
        <figure className="absolute inset-0 h-full w-full">
          <Image
            src={"/hero.jpg"}
            width={2000}
            height={2000}
            alt="olp"
            className="h-full w-full object-cover object-center"
          />
        </figure>
        <div className="max-w-2xl">
          <div className="relative z-20 flex flex-col items-start justify-center px-10 py-10 italic">
            <h2 className="relative mb-2 text-balance text-2xl font-extrabold tracking-wide before:absolute before:-left-4 before:h-full before:w-1 before:bg-primary sm:text-5xl">
              Need JCB Parts, Fast? We&apos;ve Got You Covered.
            </h2>
            <p className="text-balance text-xl">
              <span className="font-bold">2,000+</span> Spare Parts in Stock.
              Genuine, OEM & <br />
              Aftermarket Ready to Ship.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-start gap-2">
              <div className="rounded-full bg-black px-4 py-0.5 text-lg text-primary">
                Get Instant Discount
              </div>
              <div className="rounded-full bg-black px-4 py-0.5 text-lg text-primary">
                Claim 10% Discount
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-start gap-2">
              <div className="flex items-center justify-start gap-1">
                <CiGlobe size={20} />
                <span className="text-nowrap text-sm">
                  Exporting to <strong> 30+ </strong>Countries
                </span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <HiOutlineBadgeCheck size={20} />
                <span className="text-nowrap text-sm">
                  <strong>2,000+</strong> Verified Parts
                </span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <FaTruckFast size={20} />
                <span className="text-nowrap text-sm">
                  Fast Dispatch <strong>Guaranteed</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
