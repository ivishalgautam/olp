import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";

export const metadata = {
  title: "Online Parts Portal | JCB Spares Parts - Onlineparts.Shop",
  description:
    "Get all the JCB Spares Parts at one place and get them fast. Our list of JCB Genuine Parts, Earthmoving Spare Parts",
  openGraph: {
    title: "Online Parts Portal",
    description:
      "Get all the JCB Spares Parts at one place and get them fast. Our list of JCB Genuine Parts, Earthmoving Spare Parts",
    images: ["https://onlineparts.shop/og_img.jpeg"],
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
    </html>
  );
}
