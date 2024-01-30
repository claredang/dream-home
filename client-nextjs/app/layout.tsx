import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";
import Chatbot from "@/app/containers/Chatbot";
const inter = Inter({ subsets: ["latin"] });
import ReactQueryProvider from "../app/_components/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <Navbar />
        <main className="relative overflow-hidden">
          <ReactQueryProvider>
            {children}
            <ReactQueryDevtools />
          </ReactQueryProvider>
          <Analytics />
          <SpeedInsights />
          <Chatbot />
        </main>
        <Footer />
      </body>
    </html>
  );
}