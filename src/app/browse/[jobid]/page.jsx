"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button"


export default function JobDetailsPage() {
    const params = useParams();
    const id = params?.jobid;

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchJobDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:4000/api/getjob/${id}`);
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
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

    if (!id) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-xl">Loading Job ID...</div>;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-gray-600 text-xl">Loading Job Details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500 text-xl">{error}</div>;
    }

    if (!job) {
        return <div className="flex justify-center items-center h-screen text-gray-500 text-xl">Job not found.</div>;
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">{job.title}</h1>
                <h2 className="text-xl text-gray-600 mb-2">{job.company}</h2>
                <p className="text-gray-700 mb-4">
                <span className="font-semibold">Location:</span> {job.location}
                </p>
                <div className="mb-4">
                <span className="font-semibold">Description:</span>
                <p className="text-gray-800 whitespace-pre-line">{job.description}</p>
                </div>
                <p className="text-sm text-gray-500">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <Button variant="outline" className='w-35 h-15 mt-10 bg-blue-500 text-white'>Button</Button>
        </div>
    );
}
