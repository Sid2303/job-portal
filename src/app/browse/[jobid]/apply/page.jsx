"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ApplyJobPage() {
    const { jobid } = useParams();
    const [coverLetter, setCoverLetter] = useState("");
    const [resume, setResume] = useState(null); // Optional for now
    const [loading, setLoading] = useState(false);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!jobid) return;

        const formData = new FormData();
        formData.append("jobId", jobid);
        formData.append("userId", "67fde3c21a9eeb52ee821bd8"); // Replace with real user ID
        formData.append("coverLetter", coverLetter);
        if (resume) formData.append("resume", resume);

        try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/applyjob", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to submit application");
        }

        setCoverLetter("");
        setResume(null);
        toast.success("🎉 Application submitted successfully!");
        } catch (err) {
        console.error("Error applying for job", err);
        toast.error(`❌ ${err.message}`);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Apply for Job</h1>
            <p className="text-center text-sm text-gray-500 mb-4">Job ID: {jobid}</p>
            <form onSubmit={handleApply} className="space-y-6">
            {/* Resume Upload (Optional) */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Resume (Optional)</label>
                <Input
                type="file"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                />
            </div>

            {/* Cover Letter */}
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Cover Letter</label>
                <Textarea
                placeholder="Write your cover letter here..."
                rows={6}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                />
            </div>

            {/* Submit Button */}
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
