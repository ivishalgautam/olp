import ContactForm from "@/components/forms/contact";
import { H3, Small } from "@/components/ui/typography";

export const metadata = {
  title: "Contact US - JCB Spare Parts Manufacturer from Faridabad",
  description:
    "Contact and Whatsapp Number +91 9811632400 | +91 7042888653 or you can mail us on : sales@onlineparts.in",
  keywords:
    "Online Parts Shop Earthmovers Near Paramdham Mandir, Badkhal Extension, Faridabad Gurgaon Road, Faridabad-121001, Haryana, INDIA, Jcb Slew Cylinder SEAL KIT 991/00103, BUSH SMALL END 320/03017 LINER BEARING BUSH OPERATOR SEAT 332/Y8344, INJECTOR SLEEVE STEEL 320/02579, PUMP ASSY. 20/925327,OIL SEAL FRONT 320/03119, HOSE TOP RAD 834/11380,HOSE TOP RAD 834/11380, BUSH SMALL END 320/03017, COOLER EGR T4 56KW 320/06165, LIFT PUMP DIESEL FUEL 320/A7161, BLEED SCREW 816/60040, RE SILIENT MOUNT 123/03138, RE SILIENT MOUNT 123/03138,CAM SHAFT ASSY 320/03681,RADIATOR HOSE 834/00322, SEAL ROCKER COVER 320/07580, BUCKET TOOTH 531/03205, HOSE TRANS TO RADIATOR 332/C6437, BUCKET TOOTH 531/03205, CAM SHAFT ASSY 320/03681",
  authors: [{ name: "Online Parts Shop" }],
  publisher: "Online Parts Shop",
  openGraph: {
    title: "Contact US - JCB Spare Parts Manufacturer from Faridabad",
    description:
      "Contact and Whatsapp Number +91 9811632400 | +91 7042888653 or you can mail us on : sales@onlineparts.in",
    images: ["https://onlineparts.shop/og_img.jpeg"],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
  },
};

export default function Page() {
  return (
    <section className="bg-primary pt-32">
      <div className="container">
        <div className="mx-auto max-w-xl space-y-8 rounded-md bg-white p-8">
          <div className="flex flex-col items-center justify-center gap-3">
            <H3>Drop us a line</H3>
            <Small className={"text-gray-400"}>
              Contact us for any question
            </Small>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
