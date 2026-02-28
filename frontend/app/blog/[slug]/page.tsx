"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/api";

export default function BlogPost() {
    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/public/blogs/${slug}`);
                setBlog(res.data);
            } catch (error) {
                console.error("Blog not found", error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchBlog();
    }, [slug]);

    if (loading) return <div className="p-10 text-center">Loading post...</div>;
    if (!blog) return <div className="p-10 text-center">Post not found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-sm border rounded-lg">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{blog.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-8 border-b pb-4">
                <span>By {blog.user?.email}</span>
                <span className="mx-2">•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                {blog.content}
            </div>
        </div>
    );
}