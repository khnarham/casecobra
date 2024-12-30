import type { Metadata } from "next";
import { Geist, Geist_Mono, Recursive } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Provider";
import { constructMetadata } from "@/lib/utils";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ['400']
});

export const metadata = constructMetadata()

const recursive = Recursive({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${recursive.className} `}
      >
        <Navbar/>
            <Toaster />
        <main className="flex  flex-col min-h-[calc(100vh-2.5rem-1px)]">
            <div className="flex-1  flex flex-col h-full" >
              <Providers>
        {children}
              </Providers>
        <Footer/>
            </div>
        </main>
      </body>
    </html>
  );
}
