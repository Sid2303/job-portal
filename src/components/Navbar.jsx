"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    fetchUser();
    window.addEventListener("user-updated", fetchUser);
    return () => window.removeEventListener("user-updated", fetchUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const linkClass = (href) =>
    `hover:text-purple-600 transition font-medium ${
      pathname === href ? "text-purple-700 text-lg font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="bg-white shadow-md z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-purple-700">
          <Link href="/">JobHunt</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/browse" className={linkClass("/browse")}>
            Browse Jobs
          </Link>
          <Link href="/postjob" className={linkClass("/postjob")}>
            Post a Job
          </Link>
          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>
        </div>

        {/* Auth Buttons or Avatar */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-4 bg-white shadow-xl rounded-lg space-y-2">
                  <Link href="/profile" className="text-gray-700 hover:text-purple-600">
                    Profile
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
              <span className="text-gray-700 font-medium">
                {user.name?.split(" ")[0]}
              </span>
            </div>
          ) : (
            <>
              <Link href="/login">
                <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 pt-4 space-y-3 border-t border-gray-200 bg-white shadow">
          <div className="flex flex-col space-y-3">
            <Link href="/" className={linkClass("/") + " block"}>
              Home
            </Link>
            <Link href="/browse" className={linkClass("/browse") + " block"}>
              Browse Jobs
            </Link>
            <Link href="/postjob" className={linkClass("/postjob") + " block"}>
              Post a Job
            </Link>
            <Link href="/about" className={linkClass("/about") + " block"}>
              About
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button className="w-full text-left px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="w-full text-left px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  );
}
