import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Navbar } from "./components/navbar";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '700']});

export const metadata: Metadata = {
  title: "JWS Online",
  description: "Sign Up and receive updates for job listings from select companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}><Navbar></Navbar>{children}</body>
    </html>
  );
}
