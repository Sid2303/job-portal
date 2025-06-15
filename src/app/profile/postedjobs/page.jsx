"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function JobPosterDashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [applicationsMap, setApplicationsMap] = useState({});

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            if (parsedUser.role === "recruiter" || parsedUser.role === "admin") {
                fetchJobs(parsedUser._id);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
        console.log(storedUser)
    }, []);

    const fetchJobs = async (userId) => {
        try {
            // Call the new route
            const res = await fetch(`http://localhost:4000/api/getjobsbyuser/${userId}`);
            
            if (!res.ok) throw new Error("Failed to fetch jobs");
            
            const data = await res.json();
            console.log("User's jobs:", data); // Debug log
            setJobs(data);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            // Optional: Set an error state to show to the user
        } finally {
            setLoading(false);
            console.log(jobs)
        }
    };

    const fetchApplications = async (jobId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/getapplications/${jobId}`);
            const data = await res.json();
            setApplicationsMap((prev) => ({ ...prev, [jobId]: data }));
        } catch (err) {
            console.error("Error fetching applications:", err);
        }
    };

    const deleteJob = async (jobId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/deletejob/${jobId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete job");
            setJobs((prev) => prev.filter((job) => job._id !== jobId));
        } catch (err) {
            console.error("Error deleting job:", err);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    if (!user || (user.role !== "recruiter" && user.role !== "admin")) {
        return <div className="p-8 text-center text-red-500">🔒 This section is locked for your role.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Your Posted Jobs</h1>
            {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-500">{job.company} | {job.location}</p>
                    <p className="text-sm mt-2">{job.type} | Salary: {job.salary}</p>
                    <p className="mt-4">{job.description}</p>

                    <div className="flex gap-4 mt-6">
                        <Button className="bg-purple-600"onClick={() => router.push(`/profile/postedjobs/editjob/${job._id}`)}>Edit</Button>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteJob(job._id)}>
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button variant="outline" onClick={() => fetchApplications(job._id)}>
                            View Applications
                        </Button>
                    </div>

                    {applicationsMap[job._id] && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-lg font-semibold mb-2">Applications:</h3>
                            {applicationsMap[job._id].length === 0 ? (
                                <p className="text-sm text-gray-500">No applications yet.</p>
                            ) : (
                                <ul className="space-y-2">
                                    {applicationsMap[job._id].map((app) => (
                                        <li key={app._id} className="border p-3 rounded-md">
                                            <p><strong>Name:</strong> {app.applicantName}</p>
                                            <p><strong>Email:</strong> {app.applicantEmail}</p>
                                            <p><strong>Cover Letter:</strong> {app.coverLetter}</p>
                                            <p className="text-xs text-gray-400 mt-1">Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
