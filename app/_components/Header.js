"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white shadow-md lg:px-10">
      <Link href="/">
        <h1 className="text-2xl font-semibold cursor-pointer">Ticketist</h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="flex-row items-center hidden gap-8 text-sm lg:flex">
        <ul className="flex gap-8">
          <li className="cursor-pointer hover:text-[#32BC9B]">Browse events</li>
          <li className="cursor-pointer hover:text-[#32BC9B]">Help</li>
        </ul>
        <button className="px-4 py-1 border border-black rounded-xl hover:bg-gray-100">
          Sign in
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 z-10 w-full bg-white shadow-lg top-16 lg:hidden">
          <ul className="flex flex-col items-center gap-6 py-4 text-sm">
            <li
              className="cursor-pointer hover:text-[#32BC9B]"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse events
            </li>
            <li
              className="cursor-pointer hover:text-[#32BC9B]"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </li>
            <button
              className="px-6 py-2 border border-black rounded-xl hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </button>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
