import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import type { Viewport } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LU CribCheck",
  description:
    "Find student opinions on student accomodation at Lancaster University.",
  authors: [{ name: "Eric Daniels" }],
  keywords: [
    "Lancaster University",
    "Student Accomodation",
    "Reviews",
    "Ratings",
    "LU",
    "CribCheck",
    "Student Housing",
    "Student Housing Reviews",
    "Student Housing Ratings",
  ],
};

 
export const viewport: Viewport = {
  colorScheme: "only light",
  width: "device-width",
  themeColor: "#000000",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        style={{
          backgroundAttachment: "scroll", // Ensures background scrolls with content
          backgroundPosition: "center center", // Center background
          backgroundRepeat: "repeat", // Avoid tiling if it's not intended
        }}
        className={`${inter.className}  bg-[url('../assets/bg2-bigger.jpg')] bg-center bg-repeat bg-cover min-h-screen flex flex-col`}
      >
        <SessionProvider session={session}>
          <main
            className="bg-base-100/40 backdrop-blur-md flex-grow flex flex-col"
            style={{
              WebkitBackdropFilter: "blur(10px)", // CamelCase for the vendor prefix
              backdropFilter: "blur(10px)", // Regular CSS property
            }}
          >
            <Navbar />
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
