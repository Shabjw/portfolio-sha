import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { StoryStack } from "@/components/sections/StoryStack";
import { ThingsOnMyMind } from "@/components/sections/ThingsOnMyMind";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <StoryStack />
        <ProjectGrid />
        <ThingsOnMyMind />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
