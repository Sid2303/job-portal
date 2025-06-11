"use client";

import { Code2, Users, Briefcase, LayoutGrid, Send } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen px-6 py-10 md:px-20 mb-10">
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-15 text-center">
            About JobHunt
        </h1>

        <p className="text-lg text-gray-700 text-center mb-15">
            JobHunt is a smart job portal crafted to simplify hiring and job searching
            using modern technologies. We ensure an intuitive experience for both recruiters and job seekers.
        </p>

        {/* Features Section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 text-purple-700 mb-4">
                    <Users size={32} />
                    <h3 className="text-xl font-semibold">For Everyone</h3>
                    </div>
                    <p className="text-gray-600">
                    Whether you’re a fresh graduate or an experienced recruiter, our platform is built with role-based access to serve your needs.
                    </p>
                </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 text-purple-700 mb-4">
                <Briefcase size={32} />
                <h3 className="text-xl font-semibold">Smart Job Posting</h3>
                </div>
                <p className="text-gray-600">
                Recruiters can easily post, edit, and manage job openings in a simple and interactive dashboard.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 text-purple-700 mb-4">
                <Send size={32} />
                <h3 className="text-xl font-semibold">Apply with Ease</h3>
                </div>
                <p className="text-gray-600">
                Job seekers can browse jobs, filter by skills or location, and apply directly with real-time status updates.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 text-purple-700 mb-4">
                <Code2 size={32} />
                <h3 className="text-xl font-semibold">Modern Tech Stack</h3>
                </div>
                <p className="text-gray-600">
                Powered by React, Next.js, Node.js, MongoDB, and Tailwind CSS for a blazing fast and scalable experience.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 text-purple-700 mb-4">
                <LayoutGrid size={32} />
                <h3 className="text-xl font-semibold">Responsive Design</h3>
                </div>
                <p className="text-gray-600">
                Fully responsive across all screen sizes. Access the portal from desktop, tablet, or mobile with ease.
                </p>
            </div>
        </div>

        {/* Mission Section */}
        <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-purple-800 mb-4">Our Mission</h2>
                <p className="text-gray-700 max-w-3xl mx-auto">
                    We aim to bridge the gap between talent and opportunity with a seamless, secure, and smart platform.
                    From intuitive design to real-time interactions, we strive to enhance the recruitment journey for everyone.
                </p>

                <div className="mt-8 flex justify-center">
                    <img src={"./missionimpossible.jpg"} width={"400px"}></img>
                </div>
            </div>
        </div>
        </div>
    );
}
