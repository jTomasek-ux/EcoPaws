import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "EcoPaws",
    template: "%s · EcoPaws",
  },
  description: "Radically reclaimed denim. From dog lovers to dog lovers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivoBlack.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
