import React, { useEffect, useState } from "react";
import { Trash2, Download } from "lucide-react"; // icons
import GradientText from "../components/ui/GradientText";

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/gallery`
        );
        const apiData = await res.json();
        const parsedBody =
          typeof apiData.body === "string"
            ? JSON.parse(apiData.body)
            : apiData.body;

        setImages(parsedBody.images || []);
      } catch (err) {
        console.error("❌ Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // 🗑️ Delete Image
  const handleDelete = async (key) => {
  if (!window.confirm("Are you sure you want to delete this image?")) return;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/gallery`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      }
    );

    let data = {};
    try {
      data = await res.json();
    } catch {
      // Sometimes Lambda returns empty body
      console.warn("⚠️ No JSON response body from API Gateway");
    }

    // ✅ Check if delete succeeded
    if (res.ok && (data.success || res.status === 200)) {
      setImages((prev) => prev.filter((img) => img.key !== key));
      console.log("🗑️ Deleted:", key);
    } else {
      console.error("Delete failed:", data);
      alert("Failed to delete image from S3");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Network error while deleting image");
  }
};

  // ⬇️ Download Image
  const handleDownload = (url, key) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = key.split("/").pop();
    a.click();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Loading gallery...
      </div>
    );

  if (images.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-gray-400 text-lg">
        No images found.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <GradientText>
          <h1 className="text-5xl font-bold mb-10 text-center">
          My Generated Images
          </h1>
      </GradientText>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.key}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg relative group"
          >
            <img
              src={img.imageUrl}
              alt={img.key}
              className="w-full h-64 object-cover"
              loading="lazy"
            />

            {/* Buttons (appear on hover) */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex justify-center items-center gap-4">
              <button
                onClick={() => handleDownload(img.imageUrl, img.key)}
                className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => handleDelete(img.key)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-3">
              <p className="text-sm text-gray-400 truncate">
                {img.key.split("/").pop()}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(img.lastModified).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
