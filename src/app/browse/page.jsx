"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrowseJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [skillFilter, setSkillFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const router = useRouter();

    const fetchJobs = async () => {
        try {
            const query = skillFilter ? `?skill=${skillFilter}` : "";
            const response = await fetch(`http://localhost:4000/api/getjobs${query}`);
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => { fetchJobs(); }, [skillFilter]);

    const currentJobs = jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage);
    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Browse Jobs</h1>

                <div className="flex mb-6">
                    <input
                        type="text"
                        placeholder="Search by skill (e.g., React)"
                        value={skillFilter}
                        onChange={(e) => setSkillFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-xl mr-2"
                    />
                    <button onClick={fetchJobs} className="bg-blue-600 text-white px-4 py-2 rounded-xl">Search</button>
                </div>

                {currentJobs.map(job => (
                    <div key={job._id} onClick={() => router.push(`/browse/${job._id}`)} className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg cursor-pointer">
                        <h2 className="text-2xl font-semibold">{job.title}</h2>
                        <p className="text-sm text-gray-500">{job.company} | {job.location}</p>
                        <p className="text-sm text-gray-500">{job.type}</p>
                        <p className="mt-2 text-gray-700">{job.description.slice(0, 120)}...</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {job.skills?.map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-3 py-2 rounded-lg border ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-300"}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
