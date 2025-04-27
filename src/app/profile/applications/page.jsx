"use client";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedAppId, setSelectedAppId] = useState(null); // 🆕 for tracking which app to delete

    const fetchApplications = async (userId) => {
        try {
            const res = await fetch(`http://localhost:4000/api/userapplications/${userId}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch applications: ${res.status}`);
            }
            const data = await res.json();
            setApplications(data);
        } catch (err) {
            console.error("Error fetching applications", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedAppId) return;

        try {
            const res = await fetch(`http://localhost:4000/api/deleteapplication/${selectedAppId}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to delete application");
            }

            const updatedApplications = applications.filter((application) => application._id !== selectedAppId);
            setApplications(updatedApplications);
            toast.success("✅ Application deleted successfully!");
        } catch (err) {
            console.error("Error deleting application", err);
            toast.error(`❌ Failed to delete application: ${err.message}`);
        } finally {
            setSelectedAppId(null); // Reset selected app
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            fetchApplications(parsedUser._id);
        } else {
            console.error("No logged-in user found");
            setLoading(false);
        }
    }, []);

    if (loading) return <div className="p-8">Loading applications...</div>;

    if (applications.length === 0)
        return <div className="p-8 text-center text-gray-500">No applications found.</div>;

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Applications</h1>
            <div className="grid grid-cols-1 gap-6">
                {applications.map((app) => (
                    <div key={app._id} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
                        <p className="text-gray-500">{app.company} | {app.location}</p>
                        <p className="text-sm mt-2">{app.type} | Salary: {app.salary}</p>
                        <p className="mt-4">{app.coverLetter}</p>
                        <p className="text-xs text-gray-400 mt-4">
                            Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>

                        {/* AlertDialog for Delete */}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    className="mt-5"
                                    onClick={() => setSelectedAppId(app._id)}
                                >
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your job application.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setSelectedAppId(null)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                ))}
            </div>
        </div>
    );
}
