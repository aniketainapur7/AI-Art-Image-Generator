import React, { useState } from "react";
import DotGrid from "../components/ui/DotGrid";
import GradientText from "../components/ui/GradientText";
import { useAuth } from "../context/AuthContext";

function Homepage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { authed, userEmail, signOut, idToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setImageUrl("");

      // Replace this URL with your AWS Lambda / API Gateway endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL}/first`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify({ prompt }),
      });
      // console.log(idToken)
      const data = await response.json();
      
      const body = JSON.parse(data.body);
      console.log(body)
      if (body.imageUrl) {
        setImageUrl(body.imageUrl);
      } else {
        alert("No image returned. Check server logs.");
      }
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "black",
      }}
    >
      {/* Background */}
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#271e37"
        activeColor="#5227ff"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Heading */}
        <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white">
          <GradientText>Ask ArtifexAI To Generate Image</GradientText>
        </h2>

        {/* Input + Button */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="px-4 py-2 rounded-xl w-80 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-500 rounded-xl text-white hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>

        

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-6">
            <img
              src={imageUrl}
              alt={prompt}
              className="rounded-2xl shadow-lg max-w-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
