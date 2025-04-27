"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileLayout({ children }) {
    const pathname = usePathname();

    const navLinks = [
        { href: "/profile", label: "Dashboard" },
        { href: "/profile/settings", label: "Settings" },
        { href: "/profile/applications", label: "My Applications" },
        { href: "/profile/security", label: "Security" },
        { href: "/profile/postedjobs", label: "Posted Jobs" },
    ];

    return (
        <div className="flex min-h-screen">
        {/* Left Navigation */}
        <aside className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-6">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
                <Link 
                key={link.href} 
                href={link.href}
                className={`px-4 py-2 rounded-lg hover:bg-blue-800 transition ${
                    pathname === link.href ? "bg-blue-900 font-semibold" : ""
                }`}
                >
                {link.label}
                </Link>
            ))}
            </nav>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8 bg-gray-50">
            {children}
        </main>
        </div>
    );
}
