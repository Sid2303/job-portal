"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";


export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();
    const jobId = params.id;


    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        jobTitle: "",
        company: "",
        location: "",
        type: "",
        salary: "",
        description: "",
    });

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`http://localhost:4000/api/getjob/${jobId}`);
                const data = await res.json();
                setJob(data);
                setFormData(data);
            } catch (err) {
                console.error("Failed to fetch job", err);
            } finally {
                setLoading(false);
            }
        };

        if (jobId) fetchJob();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/editjob/${jobId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Failed to update job");

            router.push("/profile/postedjobs");
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
                <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
                <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <Input name="type" value={formData.type} onChange={handleChange} placeholder="Job Type" />
                <Input name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" />
                <Button type="submit" className="w-full">Save Changes</Button>
            </form>
        </div>
    );
}
