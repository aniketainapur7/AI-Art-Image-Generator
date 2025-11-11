import React, { useEffect, useState } from "react";
import { Clock, Image as ImageIcon, AlertCircle } from "lucide-react";
import GradientText from "../components/ui/GradientText";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user history from Lambda
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/history`
        );

        const data = await res.json();
        const parsed =
          typeof data.body === "string" ? JSON.parse(data.body) : data;
        // console.log(parsed)
        setHistory(parsed.history || []);
      } catch (err) {
        console.error("❌ Error fetching history:", err);
        setError("Failed to load history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-xl">
        <div className="flex items-center gap-3 animate-pulse">
          <Clock className="text-purple-500 w-6 h-6" />
          <span>Loading your history...</span>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-400 text-lg">
        <AlertCircle className="w-6 h-6 mr-2" /> {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <GradientText>
            <h1 className="text-5xl font-extrabold  bg-clip-text text-transparent">
              Generation History
            </h1>
        </GradientText>
        
        <p className="text-sm text-gray-400 mt-2 sm:mt-0">
          Total: {history.length} image{history.length !== 1 && "s"}
        </p>
      </div>

      {/* Table container */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 shadow-lg bg-gradient-to-b from-zinc-950 to-zinc-900">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-zinc-900 text-gray-100 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-4 text-left w-[100px]">Image</th>
              <th className="px-4 py-4 text-left">Prompt</th>
              <th className="px-4 py-4 text-left w-[180px]">Timestamp</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {history.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-zinc-800/60 transition duration-150 cursor-pointer"
              >
                {/* Image */}
                <td className="px-4 py-3">
                  <div className="relative group">
                    <img
                      src={item.imageUrl}
                      onError={(e) => {
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/1665/1665731.png"; // fallback
                      }}
                      alt={item.prompt}
                      className="h-16 w-16 rounded-lg object-cover border border-zinc-700 group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <ImageIcon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </td>

                {/* Prompt */}
                <td className="px-4 py-3">
                  <div className="max-w-[400px] truncate font-medium text-gray-200">
                    {item.prompt}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.imageKey.split("/").pop()}
                  </div>
                </td>

                {/* Timestamp */}
                <td className="px-4 py-3 text-gray-400">
                  {new Date(Number(item.timestamp)).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="text-center mt-12 text-gray-500">
          <ImageIcon className="mx-auto w-10 h-10 mb-3 text-gray-600" />
          <p>No history found yet. Generate some images first!</p>
        </div>
      )}
    </div>
  );
}

export default History;
