"use client"

import React, { use } from 'react'
import { useEffect } from 'react';

export default function page() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            setUser(user);
            setLoading(false);
        };

        fetchUser();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl font-bold'>Welcome, {user.name}</h1>
                    <p className='text-lg'>Your email: {user.email}</p>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    )
}
