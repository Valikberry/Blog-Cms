// Categories Table Component
import { Trash2 } from "lucide-react";
import { useState } from "react";
export const CategoriesTable: React.FC<any> = ({ categories, onDelete }) => {
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
      <table className="min-w-full">
        <thead style={{ background: "rgba(166, 217, 206, 0.05)" }}>
          <tr>
            <th
              className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#a6d9ce" }}
            >
              Name
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
          {categories.map((category: any) => (
            <tr
              key={category._id}
              className="border-t"
              style={{ borderColor: "rgba(166, 217, 206, 0.1)" }}
            >
              <td className="px-6 py-4 text-sm font-medium text-white">
                {category.name}
              </td>
              <td className="px-6 py-4 text-sm font-medium">
                <button
                  onClick={() => onDelete(category._id)}
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
  );
};

// Category Modal Component
export const CategoryModal: React.FC<any> = ({
  show,
  onClose,
  onSubmit,
  loading,
}) => {
  const [name, setName] = useState("");

  if (!show) return null;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="backdrop-blur-xl rounded-2xl max-w-md w-full border"
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
            Add Category
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#a6d9ce" }}
              >
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
