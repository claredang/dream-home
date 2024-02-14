import type { Metadata } from "next";
import { NextAuthProvider } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Chatbot from "@/app/containers/Chatbot";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Navbar />
          <main className="relative overflow-hidden">
            {children}
            <Analytics />
            <SpeedInsights />
            <Chatbot />
          </main>
          {/* <Footer /> */}
        </NextAuthProvider>
      </body>
    </html>
  );
}
