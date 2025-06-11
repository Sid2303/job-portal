"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Redirect to home if already logged in
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
        router.push("/");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:4000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("user-updated"));
            alert("Login successful!");
            router.push("/");
        } else {
            alert(data.message || "Login failed");
        }
        } catch (error) {
        alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-[89.9vh] bg-gray-100 flex items-center justify-center p-4">
        <form
            onSubmit={loginUser}
            className="w-full max-w-md p-6 rounded-md shadow-lg border bg-white"
        >
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="mb-6 text-gray-700 text-sm">
            Enter your details to discover countless opportunities
            </p>

            <label className="block mb-1 font-semibold text-sm">
            Email<span className="text-red-500">*</span>
            </label>
            <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={userData.email}
            onChange={handleChange}
            required
            className="w-full mb-4 p-2 border rounded-md text-sm"
            />

            <label className="block mb-1 font-semibold text-sm">
            Password<span className="text-red-500">*</span>
            </label>
            <div className="relative mb-4">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md pr-10 text-sm"
            />
            <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm mb-4 gap-2">
            <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-1" />
                Remember me
            </label>
            <a href="#" className="text-purple-600">Forgot your password?</a>
            </div>

            <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 text-sm"
            >
            Log in
            </button>

            <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/register" className="text-purple-600">Register here</Link>
            </p>
        </form>
        </div>
    );
}