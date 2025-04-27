"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [jobIds, setJobIds] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!user) return;
    
        const fetchApplicationsWithJobs = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/userapplications/${user._id}`);
                const data = await res.json()

                console.log(data)
                
    
                if (!Array.isArray(data)) {
                    console.error("API did not return array:", data);
                    setLoading(false);
                    return;
                }
                
    
                const applicationsWithJobs = await Promise.all(
                    data.map(async (application) => {
                        const jobRes = await fetch(`http://localhost:4000/api/getjob/${application.jobId}`);
                        const jobData = await jobRes.json();
                        return {
                            ...application,
                            jobDetails: jobData,
                        };
                    })
                );
    
                setApplications(applicationsWithJobs);
            } catch (err) {
                console.error("Error fetching applications with jobs:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchApplicationsWithJobs();
    }, [user]);
    

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Your Applications</h1>

            {applications.length === 0 ? (
                <p className="text-center text-gray-500">No applications found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {applications.map((application) => (
                        <Card key={application._id} className="hover:shadow-lg transition">
                            <CardHeader>
                                <CardTitle>{application.jobDetails.title}</CardTitle>
                                <p className="text-sm text-gray-500">{application.jobDetails.company}</p>
                            </CardHeader>
                            <CardContent>
                                <p><strong>Location:</strong> {application.jobDetails.location}</p>
                                <p><strong>Salary:</strong> ${application.jobDetails.salary}</p>
                                <p><strong>Type:</strong> {application.jobDetails.type}</p>
                                <p><strong>Status:</strong> {application.status}</p>
                                <p className="mt-2 text-gray-600">{application.jobDetails.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
