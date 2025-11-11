import React, { useState } from "react";
import DotGrid from "../components/ui/DotGrid";
import GradientText from "../components/ui/GradientText";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup' | 'confirm'
  const [form, setForm] = useState({ email: "", password: "", confirm: "", code: "" });
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, confirmSignUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (mode === "signup") {
        if (form.password !== form.confirm) {
          alert("Passwords do not match");
          return;
        }
        await signUp({ email: form.email, password: form.password });
        alert("Sign up successful! Check your email for verification code.");
        setMode("confirm");
      } else if (mode === "confirm") {
        await confirmSignUp({ email: form.email, code: form.code });
        alert("Email confirmed! You can now sign in.");
        setMode("signin");
      } else {
        await signIn({ email: form.email, password: form.password });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error(err);
      alert(err?.message || "Authentication error");
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
      {/* Animated Background */}
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

      {/* Foreground */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.h2
          className="mb-10 text-4xl sm:text-6xl font-semibold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientText>
            {mode === "signup"
              ? "Sign Up To ArtifexAI"
              : mode === "confirm"
              ? "Verify Your Email"
              : "Welcome Back to ArtifexAI"}
          </GradientText>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative bg-[#1a132b]/60 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[90%] max-w-md flex flex-col gap-5 border border-purple-900/40"
        >
          {/* Glowing Edge */}
          {/* <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-800/40 to-transparent blur-xl -z-10"></div> */}

          {/* Email */}
          <div className="text-left">
            <label className="block text-gray-300 text-sm mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="px-4 py-2 rounded-xl w-full text-white bg-[#2a1f3c] focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Passwords */}
          {mode !== "confirm" && (
            <>
              <div className="text-left">
                <label className="block text-gray-300 text-sm mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="px-4 py-2 rounded-xl w-full text-white bg-[#2a1f3c] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              {mode === "signup" && (
                <div className="text-left">
                  <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={onChange}
                    placeholder="••••••••"
                    className="px-4 py-2 rounded-xl w-full text-white bg-[#2a1f3c] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              )}
            </>
          )}

          {/* Verification code */}
          {mode === "confirm" && (
            <div className="text-left">
              <label className="block text-gray-300 text-sm mb-2">Verification Code</label>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={onChange}
                placeholder="Enter code from email"
                className="px-4 py-2 rounded-xl w-full text-white bg-[#2a1f3c] focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}

          {/* Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading
              ? "Please wait…"
              : mode === "signup"
              ? "Sign Up"
              : mode === "confirm"
              ? "Verify"
              : "Sign In"}
          </motion.button>
        </motion.form>

        {/* Mode switch */}
        <div className="mt-6 text-gray-300">
          {mode !== "confirm" ? (
            <p>
              {mode === "signup" ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="text-purple-400 hover:underline"
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </p>
          ) : (
            <p>
              Didn’t get a code?{" "}
              <button onClick={() => setMode("signup")} className="text-purple-400 hover:underline">
                Try signing up again
              </button>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
