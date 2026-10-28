import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowLeft, CheckCircle2 } from "lucide-react";
import { siteConfig, atsKeywords } from "@/lib/data/site";
import { skillCategories } from "@/lib/data/skills";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume & ATS Optimization | Harsh Khamkar",
  description:
    "ATS-optimized resume for Data Scientist, Machine Learning Engineer, AI Engineer, Data Analyst, and Business Analyst roles. Download resume and view keyword coverage.",
  keywords: siteConfig.keywords,
};

const ATS_SCORE = 94;

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Resume & ATS Optimization
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            Recruiter-friendly resume optimized for Applicant Tracking Systems
            targeting Data Scientist, ML Engineer, AI Engineer, and Analytics
            roles.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-1 text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-500">
              ATS Compatibility Score
            </p>
            <div className="relative mx-auto mt-6 flex h-40 w-40 items-center justify-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#atsGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${ATS_SCORE * 2.64} 264`}
                />
                <defs>
                  <linearGradient id="atsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-4xl font-bold text-white">{ATS_SCORE}%</span>
            </div>
            <p className="mt-4 text-sm text-emerald-400">
              <CheckCircle2 className="mr-1 inline h-4 w-4" />
              Excellent ATS match
            </p>
            <Button className="mt-6 w-full" asChild>
              <Link href={siteConfig.resumeUrl} download>
                <Download className="h-4 w-4" />
                Download Resume (PDF)
              </Link>
            </Button>
          </Card>

          <Card className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white">Keyword Coverage Dashboard</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Optimized for recruiter searches: Data Scientist, Machine Learning
              Engineer, AI Engineer, Python Developer, SQL Analyst, Power BI Developer
            </p>
            <div className="mt-8 space-y-5">
              {atsKeywords.map((kw) => (
                <div key={kw.keyword}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-zinc-300">{kw.keyword}</span>
                    <span className="text-cyan-400">{kw.coverage}%</span>
                  </div>
                  <Progress value={kw.coverage} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-8">
          <h2 className="text-xl font-semibold text-white">Skills Match Visualization</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <h3 className="font-medium" style={{ color: cat.color }}>
                  {cat.name}
                </h3>
                <ul className="mt-3 space-y-1">
                  {cat.skills.map((s) => (
                    <li key={s.name} className="flex justify-between text-sm text-zinc-400">
                      <span>{s.name}</span>
                      <span>{s.level}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>

        <article className="prose-invert mt-12 max-w-none">
          <h2 className="text-2xl font-bold text-white">ATS-Optimized Professional Summary</h2>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Results-driven <strong className="text-white">Data Scientist</strong> and{" "}
            <strong className="text-white">Machine Learning Engineer</strong> with
            hands-on experience as a <strong className="text-white">Data Analyst</strong>{" "}
            and <strong className="text-white">Business Analyst</strong>. Proficient in
            Python, SQL, statistical modeling, Power BI, and explainable AI (SHAP).
            Proven track record delivering predictive analytics, customer segmentation,
            financial dashboards, and AI-powered analytics solutions that drive measurable
            business outcomes.
          </p>
        </article>
      </div>
    </div>
  );
}
