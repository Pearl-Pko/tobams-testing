import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex ">
          <NavBar></NavBar>
          <div className="p-6 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
