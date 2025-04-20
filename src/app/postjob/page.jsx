"use client"

import React, { useState } from 'react';

export default function Page() {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        type: '',
        description: '',
        requirements: '',
        salary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/postjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    postedBy: "67fde691858245e64bde7fde" //Get real user ID later
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Job posted successfully!');
                setFormData({
                    title: '',
                    company: '',
                    location: '',
                    type: '',
                    description: '',
                    requirements: '',
                    salary: ''
                });
            } else {
                alert(result.message || 'Failed to post job');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Something went wrong while posting the job');
        }
    };

    return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
                <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl px-10 py-12 space-y-6"
                >
                <h2 className="text-4xl font-extrabold text-gray-800 text-center">
                    Post a Job
                </h2>
        
                {/* Input Fields */}
                {[
                    { id: "title", label: "Job Title" },
                    { id: "company", label: "Company Name" },
                    { id: "location", label: "Location" },
                    { id: "salary", label: "Salary", type: "number" }
                ].map(({ id, label, type = "text" }) => (
                    <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <input
                        type={type}
                        id={id}
                        value={formData[id]}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    </div>
                ))}
        
                {/* Job Type Dropdown */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                    </label>
                    <select
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                    <option value="">Select Job Type</option>
                    <option value="Full-time">Full-Time</option>
                    <option value="Part-time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                    </select>
                </div>
        
                {/* Textareas */}
                {[
                    { id: "description", label: "Job Description" },
                    { id: "requirements", label: "Requirements" }
                ].map(({ id, label }) => (
                    <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <textarea
                        id={id}
                        rows="4"
                        value={formData[id]}
                        onChange={handleChange}
                        required={id === "description"}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    />
                    </div>
                ))}
        
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition duration-300"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
}
