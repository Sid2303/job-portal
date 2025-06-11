"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./styles.css";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const router = useRouter();

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

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("user-updated"));
        toast.success("Account created successfully!");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="min-h-[89.9vh] bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={registerUser}
        className="w-full max-w-md p-6 rounded-md shadow-lg border bg-white"
      >
        <h1 className="text-3xl font-bold mb-2 text-purple-700">Join Us</h1>
        <p className="mb-6 text-gray-700 text-sm">
          Fill in your details to create your account
        </p>

        <label className="block mb-1 font-semibold text-sm">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={userData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded-md text-sm"
        />

        <label className="block mb-1 font-semibold text-sm">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={userData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded-md text-sm"
        />

        <label className="block mb-1 font-semibold text-sm">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={userData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded-md text-sm"
        />

        <label className="block mb-1 font-semibold text-sm">Role</label>
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded-md text-sm"
        >
          <option value="jobseeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 text-sm"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
