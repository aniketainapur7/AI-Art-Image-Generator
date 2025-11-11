import GradientText from "./GradientText";
import { PlaceholdersAndVanishInput } from "./PlaceholdersAndVanishInput";

export function PlaceholdersAndVanishInputDemo() {
const placeholders = [
  "A serene sunset over a futuristic city skyline",
  "A cyberpunk samurai standing in neon-lit streets",
  "A cozy cabin in the woods during snowfall",
  "An astronaut exploring an alien jungle",
  "A watercolor painting of a golden retriever",
];

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2
        className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          <GradientText>
            Ask ArtifexAI To Generate Image
          </GradientText>
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}
