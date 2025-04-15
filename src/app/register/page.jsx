"use client";

import React, { useState } from 'react';
import "./styles.css";

export default function RegisterPage() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'jobseeker',
    });

    // Update state when the form fields change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // Handle form submission
    const registerUser = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
        const response = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.status === 201) {
            console.log("User registered successfully:", data);
            // Optionally redirect to login or show success message
        } else {
            console.error("Registration failed:", data.message);
        }
        } catch (error) {
        console.error("Error registering user:", error);
        }
    };

    return (
        <form className="register-form" onSubmit={registerUser}>
        <h2>Register</h2>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
            />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            />
        </div>
        <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
            >
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
            </select>
        </div>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
        </form>
    );
}
