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
        <div className="after-hero bg-[linear-gradient(180deg,#f7efe2_0%,#f2ded8_32%,#efd7bd_65%,#e9dcca_100%)]">
          <StoryStack />
          <ProjectGrid />
        </div>
          <ThingsOnMyMind />
        <div className="bg-[linear-gradient(180deg,#c4cdd0_0%,#708899_18%,#344e65_45%,#142236_85%)]">
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
