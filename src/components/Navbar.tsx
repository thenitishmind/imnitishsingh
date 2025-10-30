"use client";

import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 font-bold text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded neon-text">
              Nitish
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  About
                </Link>
                <Link
                  href="/resume"
                  className="px-3 py-2 rounded-md text-sm font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  Resume
                </Link>
                <Link
                  href="/contact"
                  className="ml-2 inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-white text-gray-900 hover:bg-white/90 transition duration-300 shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <a
              href="https://github.com/thenitishmind"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-gray-700/80 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-label="GitHub Profile"
            >
              <FaGithub className="h-6 w-6" />
            </a>
          </div>
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <HiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenuAlt4 className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-gray-900 transition duration-300 border-t border-gray-800/80`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="block px-3 py-2 rounded-md text-base font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300"
            onClick={toggleMenu}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href="/resume"
            className="block px-3 py-2 rounded-md text-base font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300"
            onClick={toggleMenu}
          >
            Resume
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-full text-base font-bold bg-white text-gray-900 hover:bg-white/90 transition duration-300 shadow"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <a
            href="https://github.com/thenitishmind"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md text-base font-semibold text-white/90 hover:text-white hover:bg-gray-700/80 transition duration-300"
            onClick={toggleMenu}
          >
            <FaGithub className="h-5 w-5 mr-2" /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 