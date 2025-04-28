"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";



export default function Navbar() {
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

        return () => {
        window.removeEventListener("user-updated", fetchUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
            <Link href="/">JobHunt</Link>
            </div>

            <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/browse" className="hover:text-blue-600">Browse Jobs</Link>
            <Link href="/postjob" className="hover:text-blue-600">Post a Job</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
            {user ? (
                <div className="flex items-center space-x-4">
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className="hover:cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-56 p-4 bg-white shadow-lg rounded-lg">
                            <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                                Profile
                            </Link>
                            <Button variant="destructive" onClick={handleLogout} className="hover:cursor-pointer mt-2">
                                Logout
                            </Button>
                        </PopoverContent>
                    </Popover>
                    <span className="text-gray-700 font-bold">{user.name.split(" ")[0]}</span>
                </div>
            ) : (
                <>
                <Link href="/login">
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Login</button>
                </Link>
                <Link href="/register">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Sign Up</button>
                </Link>
                </>
            )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
            <Link href="/" className="block hover:text-blue-600">Home</Link>
            <Link href="/browse" className="block hover:text-blue-600">Browse Jobs</Link>
            <Link href="/postjob" className="block hover:text-blue-600">Post a Job</Link>
            <Link href="/about" className="block hover:text-blue-600">About</Link>
            <div className="pt-2 space-y-4 border-t border-gray-200">
                {user ? (
                <>
                    <span className="block">Hello, {user.name.split(" ")[0]} 👋</span>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
                        Logout
                    </button>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </>
                ) : (
                <>
                    <Link href="/login">
                    <button className="w-full text-left px-4 py-2 border mb-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">Login</button>
                    </Link>
                    <Link href="/register">
                    <button className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Register</button>
                    </Link>
                </>
                )}
            </div>
            </div>
        )}
        </nav>
    );
}
