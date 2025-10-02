// Posts Table Component
import { Edit2, Trash2, FileText, Video, Eye } from "lucide-react";
import { useEffect, useState } from "react";
export const PostsTable: React.FC<any> = ({
  posts,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div
      className="backdrop-blur-xl rounded-2xl overflow-hidden border"
      style={{
        background: "rgba(21, 17, 13, 0.6)",
        borderColor: "rgba(166, 217, 206, 0.2)",
      }}
    >
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(90deg, #a6d9ce 0%, #7bc4b8 50%, #a6d9ce 100%)",
        }}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead style={{ background: "rgba(166, 217, 206, 0.05)" }}>
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#a6d9ce" }}
              >
                Title
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#a6d9ce" }}
              >
                Type
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#a6d9ce" }}
              >
                Category
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#a6d9ce" }}
              >
                Duration
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#a6d9ce" }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr
                key={post._id}
                className="border-t"
                style={{ borderColor: "rgba(166, 217, 206, 0.1)" }}
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold w-fit"
                    style={{
                      background:
                        post.type === "video"
                          ? "rgba(166, 217, 206, 0.2)"
                          : "rgba(166, 217, 206, 0.1)",
                      color: "#a6d9ce",
                    }}
                  >
                    {post.type === "video" ? (
                      <Video className="w-3 h-3" />
                    ) : (
                      <FileText className="w-3 h-3" />
                    )}
                    {post.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {post.category?.name || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {post.duration || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                    onClick={() => onView(post)}
                    className="mr-2 p-2 rounded-lg transition-colors"
                    style={{
                      color: "#a6d9ce",
                      background: "rgba(166, 217, 206, 0.1)",
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(post)}
                    className="mr-2 p-2 rounded-lg transition-colors"
                    style={{
                      color: "#a6d9ce",
                      background: "rgba(166, 217, 206, 0.1)",
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(post._id)}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      color: "#ec1a2a",
                      background: "rgba(236, 26, 42, 0.1)",
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Post Modal Component
export const PostModal: React.FC<any> = ({
  show,
  onClose,
  post,
  categories,
  onSubmit,
  loading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    source_link: "",
    type: "page",
    duration: "",
    description: "",
    summary: "",
    category: "",
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        source_link: post.source_link || "",
        type: post.type,
        duration: post.duration || "",
        description: post.description || "",
        summary: post.summary || "",
        category: post.category?._id || "",
      });
    } else {
      setFormData({
        title: "",
        source_link: "",
        type: "page",
        duration: "",
        description: "",
        summary: "",
        category: "",
      });
    }
  }, [post]);

  if (!show) return null;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(formData, post?._id);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto border"
        style={{
          background: "rgba(21, 17, 13, 0.95)",
          borderColor: "rgba(166, 217, 206, 0.2)",
        }}
      >
        <div
          className="h-1"
          style={{
            background:
              "linear-gradient(90deg, #a6d9ce 0%, #7bc4b8 50%, #a6d9ce 100%)",
          }}
        />
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: "#a6d9ce" }}>
            {post ? "Edit Post" : "Add Post"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Source Link
              </label>
              <input
                type="url"
                value={formData.source_link}
                onChange={(e) =>
                  setFormData({ ...formData, source_link: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              >
                <option value="page">Page</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 10:30"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl text-white outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              >
                <option value="">Select Category</option>
                {categories.map((cat:any) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Summary
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "2px solid rgba(166, 217, 206, 0.2)",
                }}
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl font-semibold"
                style={{
                  border: "2px solid rgba(166, 217, 206, 0.3)",
                  color: "#a6d9ce",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #a6d9ce 0%, #7bc4b8 100%)",
                  color: "#15110d",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
