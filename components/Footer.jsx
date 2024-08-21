import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-red-800 dark:bg-gray-900 text-white  dark:text-gray-300 p-8">
      <div className="container mx-auto text-center">
        <Link href="/" className="flex justify-center mb-4">
          <p className="font-bold text-xl">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              LU
            </span>
            CribCheck
          </p>
        </Link>

        <p className="text-neutral-300 dark:text-gray-400 mb-2">
          Do you have any questions or suggestions? Contact us at{" "}
          <Link href="mailto:help@ericdaniels.dev" className="underline italic">
            help@ericdaniels.dev
          </Link>
        </p>

        <Link
          href="https://www.ericdaniels.dev/"
          target="_blank"
          className="text-neutral-300 dark:text-gray-400 hover:text-red-500 transition-colors mb-2 inline-block"
        >
          Made by <span className="underline italic">Eric Daniels</span>
        </Link>

        <p className="text-neutral-400 dark:text-gray-500">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </footer>
  );
}
