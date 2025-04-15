"use client"

import React from 'react'
import "./styles.css"

export default function Page() {
    const [userData, setUserData] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log("✅ Login successful:", data);
                window.alert("Login successful!");
                // Optionally: redirect or store token
            } else {
                console.error("❌ Login failed:", data.message);
                // Show error to user (optional)
            }
        } catch (err) {
            console.error("❌ Error:", err);
        }
    };

    return (
        <form className="login-form" onSubmit={loginUser}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    className='border-2 border-black'
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
                    className='border-2 border-black'
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
