import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
  viewport: "width=device-width, initial-scale=1.0",
};

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
            className="bg-base-100/20 backdrop-blur-md flex-grow flex flex-col"
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
