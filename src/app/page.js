"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Search, UserPlus, Laptop2 } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/browse");
    } else {
      router.push("/register");
    }
  };

  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen flex flex-col items-center text-gray-800">
      {/* Hero Section */}
      <section className="w-full px-6 md:px-20 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-6">
            Discover Your <span className="text-purple-500">Dream Job</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Smart Job Portal connects talented individuals with top companies.
            Find the perfect role or the perfect candidate.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-purple-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-800 transition"
          >
            Get Started
          </button>
        </motion.div>

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="bg-purple-100 p-10 rounded-full shadow-lg">
            <Laptop2 size={160} className="text-purple-700" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full px-6 md:px-20 py-20 bg-white">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-12"
        >
          Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <Search className="text-purple-700 mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
            <p>
              Easily filter jobs based on skills, location, and experience to
              find the best match.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <Briefcase className="text-purple-700 mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Post & Manage Jobs</h3>
            <p>
              Recruiters can create, edit, and manage job posts with a user-friendly interface.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purple-50 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <UserPlus className="text-purple-700 mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
            <p>
              Separate dashboards and permissions for job seekers and recruiters for better experience.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
