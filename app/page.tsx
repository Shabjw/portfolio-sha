import { Footer } from "@/components/Footer";
import { EndingScene } from "@/components/sections/EndingScene";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { StoryStack } from "@/components/sections/StoryStack";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <StoryStack />
        <ProjectGrid />
        <EndingScene />
      </main>
      <Footer />
    </>
  );
}
