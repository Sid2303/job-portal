"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setFormData({
                name: parsed.name || "",
                email: parsed.email || "",
                role: parsed.role || "",
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/updateuser/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update user");

            const updatedUser = await res.json();
            localStorage.setItem("user", JSON.stringify(updatedUser));
            toast.success("User details updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user");
        }
    };

    if (!user) return <div className="p-8">Loading user info...</div>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    name="role"
                    placeholder="Role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled // If you don't want to allow role changes, remove this if needed
                />
                <Button type="submit" className="w-full">Save Changes</Button>
            </form>
        </div>
    );
}
