"use client";
import { useState, useEffect } from "react";
import LogInButton from "@/components/auth/LogInButton";
import SearchNavBar from "@/components/SearchNavBar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const cock = useSession()
  console.log(session);
  console.log("cock", cock)


  return (
    <div className="navbar bg-base-100 shadow-lg hover:shadow-none transition-shadow absolute">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <h2>
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              LU
            </span>
            CribCheck
          </h2>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <SearchNavBar />
      </div>
      {session && session.user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="avatar online placeholder">
              <div className="bg-neutral text-neutral-content w-10 rounded-full">
                <span className="text-lg">
                  {session.user.name ? session.user.name[0] : "?"}
                </span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <p className="text-xl font-semibold p-2 w-full">
              Hello,{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                {session?.user?.name || "?"}
              </span>
              !{" "}
            </p>
            <li>
              <a href="/registerHouse">Add a house</a>
            </li>
            <li onClick={() => signOut()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <LogInButton />
      )}
    </div>
  );
}
