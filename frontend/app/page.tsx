"use client";

import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/public/feed");
        setBlogs(res.data.data); // data array from our paginated backend response
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-600">Loading feed...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 mt-4">Latest Posts</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600 bg-white p-6 rounded-lg shadow-sm">No blogs published yet. Be the first to write one!</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog: any) => (
            <div key={blog.id} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                By {blog.user?.email} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{blog.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}