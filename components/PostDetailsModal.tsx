import { FileText, Video, Tag, Clock, ExternalLink, X } from "lucide-react";
type Post = {
  id?: string | number;
  title: string;
  description?: string;
  summary?: string;
  type: "video" | "article" | "document" | string;
  category?: {
    id?: string | number;
    name: string;
  };
  duration?: string;
  source_link?: string;
};
interface PostDetailsModalProps {
  post: Post | null; // allow null so the modal can be hidden
  onClose: () => void;
}

export const PostDetailsModal: React.FC<PostDetailsModalProps> = ({
  post,
  onClose,
}) => {
  if (!post) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ background: "rgba(0, 0, 0, 0.7)" }}
    >
      <div
        className="relative backdrop-blur-xl rounded-2xl max-w-md w-full border"
        style={{
          background: "rgba(21, 17, 13, 0.95)",
          borderColor: "rgba(166, 217, 206, 0.2)",
          maxHeight: "90vh",
        }}
      >
        <div
          className="flex justify-between items-start p-4 border-b sticky top-0 z-10"
          style={{
            background: "rgba(21, 17, 13, 0.95)",
            borderColor: "rgba(166, 217, 206, 0.1)",
          }}
        >
          <div className="flex flex-wrap gap-3">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
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
            {post.category && (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(166, 217, 206, 0.1)",
                  color: "#a6d9ce",
                }}
              >
                <Tag className="w-3 h-3" />
                {post.category.name}
              </span>
            )}
            {post.duration && (
              <span
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: "rgba(166, 217, 206, 0.1)",
                  color: "#a6d9ce",
                }}
              >
                <Clock className="w-3 h-3" />
                {post.duration}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 56px)" }}
        >
          <h3 className="text-xl font-bold text-white text-center p-6">
            {post.title}
          </h3>

          {post.source_link && (
            <div
              className="p-6 border-b"
              style={{ borderColor: "rgba(166, 217, 206, 0.1)" }}
            >
              {post.type === "video" && post.source_link ? (
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    src={getYouTubeEmbedUrl(post.source_link) || ""}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={post.source_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium"
                  style={{
                    background: "rgba(166, 217, 206, 0.1)",
                    color: "#a6d9ce",
                    border: "1px solid rgba(166, 217, 206, 0.2)",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="truncate">{post.source_link}</span>
                </a>
              )}
            </div>
          )}

          <div
            className="p-6 border-b"
            style={{ borderColor: "rgba(166, 217, 206, 0.1)" }}
          >
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#a6d9ce" }}
            >
              Description
            </label>
            <p className="text-gray-300 text-sm leading-relaxed">
              {post.description || (
                <span className="text-gray-500 italic">No description</span>
              )}
            </p>
          </div>

          <div className="p-6">
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#a6d9ce" }}
            >
              Summary
            </label>
            <p className="text-gray-300 text-sm leading-relaxed">
              {post.summary || (
                <span className="text-gray-500 italic">No summary</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
