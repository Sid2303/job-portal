"use client";

import React, { useState } from 'react';
import { toast } from "sonner"; // ✅ import toast
import { useRouter } from "next/navigation"; // ✅ router for redirect
import "./styles.css";

export default function Page() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter(); // ✅ Next.js router

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log("✅ Login successful:", data);

                // Save user in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));

                // Dispatch custom event to update navbar
                window.dispatchEvent(new Event("user-updated"));

                toast.success("Login successful! 🎉");

                // Redirect after a small delay
                setTimeout(() => {
                    router.push("/");
                }, 1000);

            } else {
                console.error("❌ Login failed:", data.message);
                toast.error(data.message || "Login failed");
            }
        } catch (err) {
            console.error("❌ Error:", err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <form className="login-form" onSubmit={loginUser}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className="border-2 border-black p-2 rounded-md"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    className="border-2 border-black p-2 rounded-md"
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Login
            </button>
        </form>
    );
}
