import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
  title:
    "Online Parts Shop - JCB Spare Parts in India | Earthmoving Spare Parts",
  description:
    "Online Parts Shop - Leading manufacture of authentic JCB Spare parts and Earthmoving spare parts in India. Experience top-quality products and exceptional customer support.",
  keywords:
    "jcb spare parts in india, jcb spare parts, Earthmoving spare parts in india jcb spare parts of india, Earthmoving spare parts  jcb spare parts in faridabad, jcb parts, jcb genuine parts, jcb spare parts online, spare parts of jcb, jcb engine spare parts, jcb spare parts manufacturer, jcb spare parts suppliers, jcb spare parts manufacturer in india,jcb spare parts manufacturer in faridabad, jcb spare parts price, Earthmoving spare parts wholesale suppliers, jcb spares suppliers, jcb spares wholesale suppliers, Earthmoving spare manufacturers in india",
  authors: [{ name: "Online Parts Shop" }],
  publisher: "Online Parts Shop",
  openGraph: {
    title:
      "Online Parts Shop - JCB Spare Parts in India | Earthmoving Spare Parts",
    description:
      "Online Parts Shop - Leading manufacture of authentic JCB Spare parts and Earthmoving spare parts in India. Experience top-quality products and exceptional customer support.",
    images: ["https://onlineparts.shop/og_img.jpeg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
  verification: {
    google: "8h3AdhyQjMVo6rNeDBE7Bni4OaYT9sAi8iJHh5z1-4U",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <Context>
            <Toaster richColors />
            <Layout>{children}</Layout>
          </Context>
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId="G-88GM0PE8E2" />
    </html>
  );
}
