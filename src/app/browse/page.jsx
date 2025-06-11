"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function BrowseJobsPage() {
    const [jobs, setJobs] = useState([]);
    const [skillFilter, setSkillFilter] = useState("");
    const router = useRouter();

    const fetchJobs = async () => {
        try {
            const query = skillFilter ? `?skill=${skillFilter}` : "";
            const response = await fetch(`http://localhost:4000/api/getjobs${query}`);
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [skillFilter]);

    return (
        <div className="min-h-screen bg-purple-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
                    Browse Jobs
                </h1>

                <div className="flex mb-8 justify-center">
                    <input
                        type="text"
                        placeholder="Search by skill (e.g., React)"
                        value={skillFilter}
                        onChange={(e) => setSkillFilter(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                        onClick={fetchJobs}
                        className="ml-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition"
                    >
                        Search
                    </button>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job, idx) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => router.push(`/browse/${job._id}`)}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl cursor-pointer transition-all border border-purple-100"
                        >
                            <h2 className="text-xl font-semibold text-purple-800">{job.title}</h2>
                            <p className="text-sm text-gray-500">
                                {job.company} &nbsp;|&nbsp; {job.location}
                            </p>
                            <p className="text-sm text-purple-600">{job.type}</p>
                            <p className="mt-2 text-gray-700 line-clamp-4">{job.description}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {job.skills?.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
