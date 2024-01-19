"use client";
import { NAV_LINKS } from "@/app/constants";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flexBetween max-container padding-container z-30 py-5 shadow-md ring-1 ring-slate-900/5">
      <Link href="/">DREAM HOME</Link>
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
        <Link href="/explore">Explore test</Link>
        <Link href="/quiz-test">Quiz test</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
