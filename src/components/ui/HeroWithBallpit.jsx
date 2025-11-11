import Ballpit from "./BallPit";
import { motion } from "framer-motion";
import { FloatingNavDemo } from "./FloatingNavDemo";
import { Link } from "react-router-dom";

export default function HeroWithBallpit() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden",background:"black" }}>
      
      {/* <div className="absolute top-0 left-0 right-0 z-20">
        <FloatingNavDemo />
      </div> */}
      
      <Ballpit
        count={100}
        gravity={0.01}
        friction={0.9975}
        wallBounce={0.95}
        followCursor={false}
        colors={["#ffffff", "#3B3BFF", "#A0A0A0", "#333333"]}
        ambientColor={0xffffff}
        ambientIntensity={1}
        lightIntensity={200}
        minSize={0.6}
        maxSize={1.1}
        size0={1}
        maxVelocity={0.15}
        maxX={5}
        maxY={5}
        maxZ={2}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-6 rounded-full border border-gray-700 px-4 py-2 text-lg text-white/80">
            Turn Words into Art with AI
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        >
          Create Stunning AI Art <br />
          from a Single Prompt
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 max-w-xl text-lg text-white/80"
        >
          Generate unique artwork using the power of AI. Built on HuggingFace +
          Stable Diffusion.
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to='/auth'>
            <button className="rounded-full bg-white px-6 py-3 font-semibold text-black shadow-md hover:bg-gray-200">
            Get Started
            </button>
          </Link>
          
          {/* <button className="rounded-full border border-white/40 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">
            View Gallery
          </button> */}
        </div>
      </div>
    </div>
  );
}