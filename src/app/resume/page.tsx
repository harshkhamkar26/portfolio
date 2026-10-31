import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, ShieldCheck, Mail, FileText, BookOpen, ExternalLink } from "lucide-react";
import { siteConfig, experiences, certifications, atsKeywords, publications } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Verified Resume & Profile | Harsh Khamkar · Data Science Engineer",
  description: "Official ATS-optimized resume, technical profile, and credential verification for Harsh Khamkar, Data Science Engineer & Data Analyst.",
  keywords: siteConfig.keywords,
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#16181c] text-[#ece5d5]">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8 sm:py-20">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#ece5d5]/60 transition hover:text-[#ff6a1a]"
        >
          <ArrowLeft size={15} /> Back to Terminal Origin
        </Link>

        <div className="border border-[#ece5d5]/15 bg-[#191b21] p-5 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden border-2 border-[#ff6a1a] shadow-[0_0_20px_rgba(255,106,26,0.25)]">
                <Image
                  src="/images/harsh-khamkar.jpg"
                  alt="Harsh Khamkar"
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#9dfc3f] flex items-center gap-1.5">
                  <ShieldCheck size={14} /> ATS OPTIMIZED · RECRUITER VERIFIED
                </span>
                <h1 className="mt-1 font-display text-2xl sm:text-4xl font-black uppercase text-white">
                  Harsh Khamkar
                </h1>
                <p className="mt-1 font-mono text-xs text-[#ffd23a] font-bold">
                  Data Science Engineer · ML Researcher · Data Analyst
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-[#ece5d5]/60">
                  B.Tech in Artificial Intelligence &amp; Data Science · Universal AI University (2024–2028)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <a
                href="/resume.pdf"
                download="Harsh_Khamkar_Resume.pdf"
                className="flex items-center justify-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-5 py-2.5 font-mono text-xs font-bold uppercase text-[#16181c] transition hover:bg-transparent hover:text-[#ff6a1a]"
              >
                <Download size={15} /> Download PDF
              </a>
              <a
                href={`mailto:${siteConfig.email}?subject=Interview%20Inquiry%20-%20Harsh%20Khamkar`}
                className="flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs text-white hover:border-[#9dfc3f] hover:text-[#9dfc3f]"
              >
                <Mail size={15} /> Contact Directly
              </a>
            </div>
          </div>

          {/* Academic Research & Publications (Under Review) */}
          <div className="mt-8 border border-[#ffd23a]/30 bg-[#14151a] p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#ffd23a]" />
                <h2 className="font-mono text-xs uppercase tracking-wider text-[#ffd23a] font-bold">
                  ACADEMIC RESEARCH &amp; PUBLICATIONS (UNDER REVIEW)
                </h2>
              </div>
              <span className="font-mono text-[10px] text-[#9dfc3f] border border-[#9dfc3f]/40 px-2 py-0.5">
                2 PEER-REVIEWED PAPERS
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {publications.map((paper) => (
                <div key={paper.id} className="border-l-2 pl-4 py-1" style={{ borderColor: paper.accent }}>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                    <span className="font-bold text-white text-sm">
                      &ldquo;{paper.title}&rdquo;
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 border" style={{ borderColor: paper.accent, color: paper.accent }}>
                      {paper.badge}
                    </span>
                  </div>
                  <p className="font-mono text-xs mt-1" style={{ color: paper.accent }}>
                    {paper.authors} · {paper.venue}
                  </p>
                  <p className="mt-2 text-xs text-[#ece5d5]/80 font-mono leading-relaxed">
                    {paper.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 font-mono text-xs">
                    <a
                      href={paper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9dfc3f] hover:underline flex items-center gap-1"
                    >
                      <ExternalLink size={12} /> View Code on GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ATS Skill Keywords */}
          <div className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#ff6a1a] mb-3">
              ATS KEYWORD ALIGNMENT
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {atsKeywords.map((item) => (
                <div key={item.keyword} className="border border-white/10 bg-black/30 p-3 font-mono text-xs flex justify-between">
                  <span className="text-white/80">{item.keyword}</span>
                  <span className="text-[#9dfc3f] font-bold">{item.coverage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Log */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#3ad7ff] mb-4">
              PROFESSIONAL WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.company} className="border-l-2 pl-4" style={{ borderColor: exp.color }}>
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-white text-sm">{exp.company}</span>
                    <span className="text-white/50">{exp.period}</span>
                  </div>
                  <p className="font-mono text-xs mt-0.5" style={{ color: exp.color }}>
                    {exp.role} · {exp.location}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-[#ece5d5]/80 font-mono">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[#ffd23a] mb-4">
              VERIFIED ACCREDITATIONS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div key={cert.name} className="border border-white/10 bg-black/20 p-3">
                  <p className="font-display font-bold text-white text-sm">{cert.name}</p>
                  <p className="font-mono text-[11px] text-[#9dfc3f] mt-0.5">{cert.issuer} · {cert.year}</p>
                  <p className="text-xs text-[#ece5d5]/60 mt-1">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-white/50">
            <span>Direct verification: harshkhamkar26@gmail.com</span>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff6a1a] hover:underline flex items-center gap-1"
            >
              <FileText size={13} /> View Raw PDF in Browser
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
