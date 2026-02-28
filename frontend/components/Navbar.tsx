"use client";

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth(); // Grabbing global state!

    return (
        <nav className="bg-white shadow-sm border-b p-4 sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                    RivalBlogs
                </Link>
                <div className="space-x-6 flex items-center">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Feed</Link>
                    {isLoggedIn ? (
                        <>
                            <Link href="/create" className="text-gray-600 hover:text-blue-600 font-medium">Write a Post</Link>
                            <button onClick={logout} className="text-red-500 hover:text-red-600 font-medium">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium transition">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}