"use client";
import { NAV_LINKS } from "@/app/constants";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-10 xs:mb-[60px]">
      <SessionProvider session={session}>
        <nav className="flexBetween max-container padding-container fixed top-0 w-full bg-white z-30 py-5 shadow-md ring-1 ring-slate-900/5">
          <Link href="/">
            <Image
              src="./logo-nav-no-bg.svg"
              alt="spinner"
              width={80}
              height={80}
              className="object-contain"
            />
          </Link>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button onClick={toggleNavbar}>
              <svg
                className="h-6 w-6 fill-current text-gray-50 hover:text-gray-50 focus:text-gray-50 focus:outline-none"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            </button>

            {/* Dropdown menu for small screens */}
            {isOpen && (
              <ul className="absolute top-16 left-0 bg-slate-200 w-full text-center py-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      key={link.key}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-gray-50 font-semibold transition-all hover:font-bold"
                    >
                      {link.label.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* For larger screens */}
          <ul className="hidden h-full gap-12 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                href={link.href}
                key={link.key}
                className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </ul>
          {!user && (
            <>
              <Link href="/login" className="text-ct-dark-600">
                Login
              </Link>
            </>
          )}
          {user && (
            <>
              <Link href="/profile" className="text-ct-dark-600">
                Profile
              </Link>
              <button className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </button>
            </>
          )}
        </nav>
      </SessionProvider>
    </div>
  );
};

export default Navbar;
