"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PostJobPage() {
    const [formData, setFormData] = useState({
        title: '', company: '', location: '', type: '',
        description: '', requirements: '', salary: '', skills: ''
    });

    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            toast.error("Please login first!");
            return router.push("/login");
        }
        if (user.role !== "recruiter" && user.role !== "admin") {
            toast.error("Only recruiters or admins can post jobs!");
            return router.push("/");
        }
        setUserRole(user.role);
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const payload = {
            ...formData,
            requirements: formData.requirements.split(",").map(r => r.trim()),
            skills: formData.skills.split(",").map(s => s.trim()),
            postedBy: user._id,
        };

        try {
            const res = await fetch('http://localhost:4000/api/postjob', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await res.json();

            if (res.ok) {
                toast.success("Job posted successfully!");
                setFormData({
                    title: '', company: '', location: '', type: '',
                    description: '', requirements: '', salary: '', skills: ''
                });
            } else {
                toast.error(result.message || "Failed to post job");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong");
        }
    };

    if (!userRole) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-10 py-12 space-y-6">
                <h2 className="text-4xl font-bold text-gray-800 text-center">Post a Job</h2>

                {["title", "company", "location", "salary"].map(id => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{id[0].toUpperCase() + id.slice(1)}</label>
                        <input type={id === "salary" ? "number" : "text"} id={id} value={formData[id]} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3" />
                    </div>
                ))}

                <div>
                    <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                    <select id="type" value={formData.type} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3">
                        <option value="">Select Job Type</option>
                        {["Full-time", "Part-time", "Contract", "Internship", "Remote"].map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>

                {["description", "requirements", "skills"].map(id => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium mb-1">
                            {id === "skills" ? "Required Skills (comma-separated)" : id[0].toUpperCase() + id.slice(1)}
                        </label>
                        <textarea id={id} rows="3" value={formData[id]} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none" />
                    </div>
                ))}

                <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">Post Job</button>
            </form>
        </div>
    );
}
