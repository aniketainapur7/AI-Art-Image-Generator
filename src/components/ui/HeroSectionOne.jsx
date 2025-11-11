import { motion } from "motion/react";
import Ballpit from "./BallPit";

export function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <Ballpit
          count={200}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={true}
          colors={[
            0xf97316, // Orange
            0x60a5fa, // Blue
            0x10b981, // Green
            0xf43f5e, // Rose
            0x8b5cf6, // Purple
            0xfacc15, // Yellow
          ]}
          ambientColor={0xffffff}
          ambientIntensity={1}
          lightIntensity={200}
          minSize={0.5}
          maxSize={1}
          size0={1}
          maxVelocity={0.15}
          maxX={5}
          maxY={5}
          maxZ={2}
        />
      </div>
      {/* Decorative grid lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
      </div>

      {/* Hero content */}
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"Create Stunning AI Art with a Single Prompt"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          ArtifexAI lets you turn words into breathtaking artwork using the
          power of cutting-edge AI models like Stable Diffusion. Start creating
          your AI-powered gallery in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Generate Art
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            View Gallery
          </button>
        </motion.div>

        {/* Image preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          {/* <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://replicate.delivery/pbxt/IW2NqnmzY2dt9yPWoav9nRls4L4C4xaSBX3n0VNzmkxtXsGGA/out-0.png"
              alt="AI-generated art preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div> */}
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">ArtifexAI</h1>
      </div>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
    </nav>
  );
};
