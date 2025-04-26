"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BrowseJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/getjobs');
            const data = await res.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        } finally {
            setLoading(false);
        }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-xl">Loading Jobs...</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Browse Jobs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs?.length > 0 ? (
                    jobs.map((job) => (
                        <Link href={`/browse/${job._id}`} key={job._id} className="block">
                            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
                                <h2 className="text-2xl font-semibold text-blue-600">{job.title}</h2>
                                <p className="text-gray-500">{job.company}</p>
                            </div>
                        </Link>

            ))
        ) : (
        <p>No jobs found.</p>
        )}
            </div>
        </div>
    );
}
