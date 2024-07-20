import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-red-800 text-base-200 p-10">
      <aside>
        <Link href="/" className="cursor-pointer">
        <p className="font-bold text-xl">
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            LU
          </span>
          CribCheck
        </p>
        </Link>

        <Link
          href="https://www.ericdaniels.dev/"
          target="_blank"
          className="cursor-pointer"
        >
          Made by{" "}
          <span className="underline italic cursor-pointer">Eric Daniels</span>
        </Link>
        <p>Copyright © {new Date().getFullYear()} - All righs reserved</p>
      </aside>
    </footer>
  );
}
