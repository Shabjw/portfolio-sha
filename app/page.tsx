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
        <div className="bg-[radial-gradient(circle_at_18%_18%,rgba(214,132,125,.14),transparent_34rem),radial-gradient(circle_at_76%_48%,rgba(229,156,92,.18),transparent_42rem),radial-gradient(circle_at_72%_78%,rgba(80,119,156,.28),transparent_40rem),radial-gradient(circle_at_50%_100%,rgba(18,34,54,.42),transparent_46rem),linear-gradient(180deg,#f7efe2_0%,#f2ded8_24%,#efd7bd_52%,#d9c6b0_60%,#577895_74%,#263f5b_88%,#142236_100%)]">
          <StoryStack />
          <ProjectGrid />
          <ThingsOnMyMind />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
