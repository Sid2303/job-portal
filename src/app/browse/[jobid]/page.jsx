"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function JobDetailsPage() {
    const { jobid: id } = useParams();
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const handleApply = () => {
        router.push(`/browse/${id}/apply`);
    };

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:4000/api/deletejob/${id}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            alert("Job deleted successfully!");
            router.push("/browse");
        } else {
            alert("Failed to delete job. Please try again.");
        }
    };

    useEffect(() => {
        if (!id) return;

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            setTimeout(() => router.push("/login"), 100);
            return;
        }
        setUserRole(user.role);

        const fetchJobDetails = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/getjob/${id}`);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setJob(data);
            } catch (err) {
                console.error("Error fetching job details", err);
                setError("Failed to load job details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    if (!id || loading) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-xl">Loading Job Details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    if (!job) {
        return <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Job not found.</div>;
    }

    return (
        <div className="min-h-screen p-6 md:p-10 bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-purple-600 mb-2">{job.title}</h1>
                <h2 className="text-xl text-gray-700 mb-1">{job.company}</h2>
                <p className="text-gray-500 mb-4">{job.location} • {job.type}</p>

                <div className="space-y-2 text-gray-800">
                    <p><strong>Salary:</strong> ₹{job.salary}</p>
                    {job.experience && <p><strong>Experience Required:</strong> {job.experience} years</p>}
                    {job.skills?.length > 0 && (
                        <p>
                            <strong>Skills:</strong> {job.skills.join(", ")}
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <p className="whitespace-pre-line text-gray-700">{job.description}</p>
                </div>

                <p className="text-sm text-gray-400 mt-4">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>

                <div className="flex flex-wrap gap-4 mt-8">
                    {userRole !== "recruiter" && (
                        <Button
                            onClick={handleApply}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            Apply Now
                        </Button>
                    )}

                    {userRole === "admin" && (
                        <Button
                            onClick={handleDelete}
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete Job
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
}
