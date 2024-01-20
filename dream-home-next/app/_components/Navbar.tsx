"use client";
import { NAV_LINKS } from "@/app/constants";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flexBetween max-container relative padding-container z-30 py-5 shadow-md ring-1 ring-slate-900/5">
      <Link href="/">DREAM HOME</Link>

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
                  {/* <a
                    className="block py-2 text-white font-semibold transition-all hover:font-bold"
                    onClick={() => setIsOpen(false)}
                  > */}
                  {link.label.toUpperCase()}
                  {/* </a> */}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Regular navigation for larger screens */}
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
    </nav>
  );
};

export default Navbar;
