import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Download, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data/site";
import { skillCategories } from "@/lib/data/skills";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume & Recruiter Profile | Harsh Khamkar",
  description: "Recruiter profile, technical skills, experience, and resume contact for Data Science, AI/ML, and analytics opportunities.",
  keywords: siteConfig.keywords,
};

const strengths = [
  "Python, Pandas and NumPy",
  "SQL and data preparation",
  "Scikit-learn and model evaluation",
  "Explainable AI and SHAP",
  "Power BI and Zoho Analytics",
  "Data visualization and reporting",
  "Git and GitHub",
  "React and frontend fundamentals",
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#09090d] text-[#f4f1e8]">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-[#c7ff3d]"><ArrowLeft size={16} /> Back to portfolio</Link>
        <p className="font-mono text-xs uppercase tracking-[.24em] text-[#c7ff3d]">Recruiter desk / profile</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Resume &amp; technical profile</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">B.Tech Data Science undergraduate at Universal AI University, expected graduation 2028. Interested in Data Science, AI/ML, and data analytics internships.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Request for latest resume")}&body=${encodeURIComponent("Hello, I found your portfolio and would like to request your latest resume.")}`} className="inline-flex min-h-12 items-center gap-3 bg-[#c7ff3d] px-5 py-3 text-sm font-bold text-[#101015] transition hover:bg-white"><Mail size={17} /> Request resume PDF <ArrowUpRight size={16} /></a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-3 border border-white/20 px-5 py-3 text-sm text-white transition hover:border-[#c7ff3d] hover:text-[#c7ff3d]">LinkedIn profile <ArrowUpRight size={16} /></a>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-5 text-white/40">A downloadable PDF is not linked until the actual resume file is added to the project. This page intentionally avoids inventing an ATS score or claiming that a message has been sent.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="border-white/10 bg-white/[.03]">
            <h2 className="text-xl font-bold">ATS-friendly skill keywords</h2>
            <p className="mt-2 text-sm text-white/45">Core skills to help recruiters quickly scan the profile. These are not a measured ATS match score.</p>
            <div className="mt-5 flex flex-wrap gap-2">{strengths.map((skill) => <span key={skill} className="border border-[#c7ff3d]/20 bg-[#c7ff3d]/[.06] px-3 py-2 text-xs text-white/80"><CheckCircle2 size={13} className="mr-1.5 inline text-[#c7ff3d]" />{skill}</span>)}</div>
          </Card>
          <Card className="border-white/10 bg-white/[.03]">
            <h2 className="text-xl font-bold">Professional experience</h2>
            <div className="mt-5 space-y-5">
              <div className="border-l-2 border-[#c7ff3d] pl-4"><p className="text-xs font-mono text-[#c7ff3d]">MAY–JUL 2026</p><h3 className="mt-1 font-semibold">Choice India</h3><p className="mt-1 text-sm text-white/55">Business analysis, Zoho Analytics, dashboards, SQL and workflow automation exposure.</p></div>
              <div className="border-l-2 border-[#ff572e] pl-4"><p className="text-xs font-mono text-[#ff8a6f]">APR–JUL 2025</p><h3 className="mt-1 font-semibold">One Globe Build Con LLP</h3><p className="mt-1 text-sm text-white/55">Technology &amp; Innovation internship involving frontend development and Python/ML exposure.</p></div>
            </div>
          </Card>
        </div>

        <Card className="mt-6 border-white/10 bg-white/[.03]">
          <h2 className="text-xl font-bold">Technical skill groups</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{skillCategories.map((category) => <div key={category.id} className="border border-white/10 p-4"><h3 className="font-semibold" style={{ color: category.color }}>{category.name}</h3><ul className="mt-3 space-y-2">{category.skills.map((skill) => <li key={skill.name} className="text-sm text-white/60">{skill.name}</li>)}</ul></div>)}</div>
        </Card>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">For the latest resume, use the direct email action above or connect via LinkedIn. <Link href="/" className="text-[#c7ff3d] hover:underline">Return to portfolio</Link>.</div>
      </div>
    </main>
  );
}
