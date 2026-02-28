"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Sending isPublished: true so it appears on the feed immediately
            await api.post("/blogs", { title, content, isPublished: true });
            router.push("/"); // Back to the feed
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create post");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-sm border">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Write a New Post</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Give your post a title..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            required
                            rows={8}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your thoughts here..."
                        />
                    </div>
                    <button type="submit" className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium">
                        Publish Post
                    </button>
                </form>
            </div>
        </div>
    );
}