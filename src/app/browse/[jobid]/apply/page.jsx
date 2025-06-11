"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ApplyJobPage() {
    const { jobid } = useParams();
    const [coverLetter, setCoverLetter] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (jobid) fetchJob();
        fetchUser();
    }, [jobid]);

    const fetchJob = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/getjob/${jobid}`);
            const data = await res.json();
            setJob(data);
        } catch (err) {
            console.error("Error fetching job details", err);
        }
    };

    const fetchUser = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!jobid || !coverLetter || !user || !job) return;

        try {
            setLoading(true);

            const res = await fetch("http://localhost:4000/api/applyjob", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobId: jobid,
                    userId: user._id,
                    applicantName: user.name,           // ⬅️ Send name
                    applicantEmail: user.email,         // ⬅️ Send email
                    jobTitle: job.title,
                    company: job.company,
                    location: job.location,
                    type: job.type,
                    salary: job.salary || "",
                    description: job.description || "",
                    coverLetter,
                    resumeUrl,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to submit application");
            }

            setCoverLetter("");
            setResumeUrl("");
            toast.success("🎉 Application submitted successfully!");
        } catch (err) {
            console.error("Error applying for job", err);
            toast.error(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!job) return <div className="p-8">Loading job details...</div>;
    if (!user) return <div className="p-8 text-center text-gray-500">Please login to apply.</div>;

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Apply for {job.title}</h1>
                <p className="text-center text-sm text-gray-500 mb-4">{job.company} | {job.location}</p>

                <form onSubmit={handleApply} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Cover Letter <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                            placeholder="Write your cover letter here..."
                            rows={6}
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Resume URL (Optional)
                        </label>
                        <Input
                            placeholder="https://yourdomain.com/your-resume.pdf"
                            value={resumeUrl}
                            onChange={(e) => setResumeUrl(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting...
                                </div>
                            ) : (
                                "Apply Now"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
