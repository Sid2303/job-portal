"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    <Link href="/">JobHunt</Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/browse" className="hover:text-blue-600">Browse Jobs</Link>
                    <Link href="/post" className="hover:text-blue-600">Post a Job</Link>
                    <Link href="/about" className="hover:text-blue-600">About</Link>
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/login">
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Login</button>
                    </Link>
                    <Link href="/register">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
                    <Link href="/" className="block hover:text-blue-600">Home</Link>
                    <Link href="/browse" className="block hover:text-blue-600">Browse Jobs</Link>
                    <Link href="/post" className="block hover:text-blue-600">Post a Job</Link>
                    <Link href="/about" className="block hover:text-blue-600">About</Link>
                    <div className="pt-2 space-y-4 border-t border-gray-200">
                        <Link href="/login">
                            <button className="w-full text-left px-4 py-2 border  mb-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Login</button>
                        </Link>
                        <Link href="/register">
                            <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
