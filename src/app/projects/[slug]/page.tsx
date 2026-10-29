import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { projects, getProject } from "@/lib/data/projects";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} · Harsh Khamkar`,
    description: project.description,
    keywords: [
      ...project.tags,
      "Data Scientist",
      "Machine Learning",
      "Explainable AI",
      "Universal AI University",
    ],
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    keywords: project.tags.join(", "),
    author: { "@type": "Person", name: "Harsh Khamkar" },
  };

  return (
    <div className="min-h-screen bg-[#16181c] text-[#ece5d5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className="border-b border-white/10 bg-[#121316]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Link
            href="/#depot"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#ece5d5]/60 hover:text-[#ff6a1a]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Project Fleet
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border"
              style={{
                borderColor: `${project.accent}50`,
                color: project.accent,
                backgroundColor: `${project.accent}10`,
              }}
            >
              {project.domain}
            </span>
            <span className="font-mono text-xs text-white/50">{project.status}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-black uppercase text-white">
            {project.title}
          </h1>
          <p className="mt-2 font-mono text-sm sm:text-base font-bold" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#ece5d5]/80">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-[#ff6a1a] bg-[#ff6a1a] px-5 py-2.5 font-mono text-xs font-bold uppercase text-[#16181c] hover:bg-transparent hover:text-[#ff6a1a]"
            >
              <Github size={15} /> Inspect Code on GitHub
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="border border-white/10 bg-black/40 p-4 text-center">
                <p className="font-mono text-2xl font-black text-white" style={{ color: project.accent }}>
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-xs text-white/60 uppercase">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#9dfc3f] mb-4">
            SYSTEM ARCHITECTURE PIPELINE
          </h2>
          <div className="border border-white/10 bg-[#0e1013] p-6 font-mono text-xs text-zinc-300">
            <pre className="overflow-x-auto whitespace-pre">
{`┌────────────────┐       ┌─────────────────┐       ┌────────────────┐
│  Data Layer    │ ───►  │  ML / Analysis  │ ───►  │  Intelligence  │
│  Dataset / SQL │       │  ${project.technologies[0]?.padEnd(14) ?? "Python        "} │       │  SHAP / Output │
└────────────────┘       └─────────────────┘       └────────────────┘
        │                         │                         │
        ▼                         ▼                         ▼
  Raw Ingestion            Validation Gate            Auditable Result`}
            </pre>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#3ad7ff] mb-4">
            ENGINEERING STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="border border-white/15 bg-[#1e2026] px-3 py-1 font-mono text-xs text-white">
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Challenges", items: project.challenges, color: "#ff6a1a" },
            { title: "Solutions", items: project.solutions, color: "#9dfc3f" },
            { title: "Results", items: project.results, color: "#3ad7ff" },
          ].map((block) => (
            <div key={block.title} className="border border-white/10 bg-[#16181c] p-5">
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold mb-3" style={{ color: block.color }}>
                {block.title}
              </h3>
              <ul className="space-y-2 text-xs text-[#ece5d5]/80 font-mono">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: block.color }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
