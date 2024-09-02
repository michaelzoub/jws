import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";

import { Navbar } from "./components/navbar";

const geologica = Geologica({ subsets: ["latin"]});

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
      <body className={geologica.className}><Navbar></Navbar>{children}</body>
    </html>
  );
}
