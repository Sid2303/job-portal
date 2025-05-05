"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

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
        <div className="min-h-[89.9vh] overflow-y-auto bg-gray-100 flex flex-col md:flex-row">
            {/* Left: Login Form */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-6">
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
                            {showPassword ? "🙈" : "👁️"}
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

                    <div className="text-center my-4 text-gray-500 text-sm">Or</div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border p-2 rounded-md text-sm"
                    >
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        Sign up with Google
                    </button>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link href="/register" className="text-purple-600">Register here</Link>
                    </p>
                </form>
            </div>

            {/* Right: Image Section */}
            <div className="hidden md:flex w-full md:w-1/2 bg-purple-500 justify-center items-center p-4">
                <img
                    src="https://source.unsplash.com/featured/?career,work"
                    alt="Career illustration"
                    className="max-w-full h-auto rounded-lg shadow-md"
                />
            </div>
        </div>
    );
}
