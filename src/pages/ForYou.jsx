import React, { useEffect, useState } from "react";
import GradientText from "../components/ui/GradientText";

function ForYou() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/recommend`
        );
        const data = await res.json();
        const parsed = typeof data.body === "string" ? JSON.parse(data.body) : data;
        console.log(parsed)
        setImages(parsed.images || []);
      } catch (err) {
        console.error("❌ Error fetching recommended images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        Loading recommendations...
      </div>
    );

  if (images.length === 0)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-gray-400 text-lg">
        No recommended images found.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <GradientText>
        <h1 className="text-5xl font-bold mb-10 text-center">
           Recommended for You
        </h1>
      </GradientText>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img.key}
            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform"
          >
            <img
              src={img.imageUrl}
              alt={img.key}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
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

export default ForYou;
