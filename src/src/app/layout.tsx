import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SupportWidget } from "@/components/site/SupportWidget";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { config } from "@/lib/config";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: `${config.siteName} | Buy Guns, Parts, Ammo & Optics Online`,
    template: `%s | ${config.siteName}`,
  },
  description: config.siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SupportWidget />
        </CartProvider>
      </body>
    </html>
  );
}
