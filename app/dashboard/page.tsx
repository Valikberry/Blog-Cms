"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Plus } from "lucide-react";
import { PostModal, PostsTable } from "@/components/Posts";
import { CategoriesTable, CategoryModal } from "@/components/Categories";
import { PostDetailsModal } from "@/components/PostDetailsModal";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("posts");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const handlePostSubmit = async (formData: any, postId: any) => {
    setLoading(true);
    try {
      const url = "/api/posts";
      const method = postId ? "PUT" : "POST";
      const body = postId ? { ...formData, id: postId } : formData;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      fetchPosts();
      setShowPostModal(false);
      setEditingPost(null);
    } catch (error) {
      alert("Error saving post");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (name: any) => {
    setLoading(true);
    try {
      await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      fetchCategories();
      setShowCategoryModal(false);
    } catch (error) {
      alert("Error creating category");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: any) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
    fetchPosts();
  };

  const deleteCategory = async (id: any) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
    fetchCategories();
  };

  const editPost = (post: SetStateAction<null>) => {
    setEditingPost(post);
    setShowPostModal(true);
  };

  return (
    <div
      className="flex h-screen"
      style={{
        background: "linear-gradient(135deg, #15110d 0%, #2a2520 100%)",
      }}
    >
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onLogout={handleLogout}
          onMenuClick={() => setIsMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === "posts" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: "#a6d9ce" }}
                  >
                    Posts
                  </h2>
                  <button
                    onClick={() => {
                      setEditingPost(null);
                      setShowPostModal(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, #a6d9ce 0%, #7bc4b8 100%)",
                      color: "#15110d",
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Add Post
                  </button>
                </div>
                <PostsTable
                  posts={posts}
                  onEdit={editPost}
                  onDelete={deletePost}
                  onView={setShowDetails}
                />
              </div>
            )}

            {activeTab === "categories" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: "#a6d9ce" }}
                  >
                    Categories
                  </h2>
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, #a6d9ce 0%, #7bc4b8 100%)",
                      color: "#15110d",
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Add Category
                  </button>
                </div>
                <CategoriesTable
                  categories={categories}
                  onDelete={deleteCategory}
                />
              </div>
            )}
          </div>
        </main>
      </div>

      <PostModal
        show={showPostModal}
        onClose={() => {
          setShowPostModal(false);
          setEditingPost(null);
        }}
        post={editingPost}
        categories={categories}
        onSubmit={handlePostSubmit}
        loading={loading}
      />

      <CategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onSubmit={handleCategorySubmit}
        loading={loading}
      />

      <PostDetailsModal
        post={showDetails}
        onClose={() => setShowDetails(null)}
      />
    </div>
  );
}
