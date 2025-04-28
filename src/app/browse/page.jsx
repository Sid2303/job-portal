"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrowseJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const router = useRouter();
    const handleJobClick = (jobId) => {
        router.push(`/browse/${jobId}`);
    }

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/getjobs');
                const data = await response.json();
                setJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Browse Jobs</h1>

                <div className="space-y-6">
                    {currentJobs.map(job => (
                        <div key={job._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition hover:cursor-pointer" onClick={() => handleJobClick(job._id)}>
                            <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
                            <p className="text-gray-600">{job.company} - {job.location}</p>
                            <p className="text-sm text-gray-500 mb-2">{job.type}</p>
                            <p className="text-gray-700">{job.description.slice(0, 150)}...</p>
                            <p className="mt-2 font-medium text-green-600">Salary: ₹{job.salary}</p>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-10 space-x-2">
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentPage(idx + 1)}
                            className={`px-4 py-2 rounded-lg border hover:cursor-pointer ${
                                currentPage === idx + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
