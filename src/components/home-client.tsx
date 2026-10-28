"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { LabSection } from "@/components/sections/lab-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { LeadershipSection } from "@/components/sections/leadership-section";
import { GithubSection } from "@/components/sections/github-section";
import { ContactSection } from "@/components/sections/contact-section";
import { AIAssistant } from "@/components/sections/ai-assistant";

export function HomeClient() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LabSection />
        <ExperienceSection />
        <CertificationsSection />
        <LeadershipSection />
        <GithubSection />
        <ContactSection />
      </main>
      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <AIAssistant />
    </>
  );
}
