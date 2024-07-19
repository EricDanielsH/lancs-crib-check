"use client";
import { useState, useEffect } from "react";
import LogInButton from "@/components/auth/LogInButton";
import SearchNavBar from "@/components/SearchNavBar";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [session]);

  return (
    <div className="navbar bg-base-100 shadow-lg hover:shadow-none transition-shadow absolute">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <h2>
            <span className="text-red-600">LU</span>CribCheck
          </h2>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <SearchNavBar />
      </div>
      {loggedIn ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={() => signOut()} >
              <a>Logout</a>
            </li>
        </ul>
        </div>
  ) : (
    <LogInButton />
  )
}
    </div >
  );
}
