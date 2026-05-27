import { CommandPalette } from "@/components/CommandPalette";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { EndingScene } from "@/components/sections/EndingScene";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { StoryStack } from "@/components/sections/StoryStack";

export default function Home() {
  return (
    <>
      <Header />
      <CommandPalette />
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
