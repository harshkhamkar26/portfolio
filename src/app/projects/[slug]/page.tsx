import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { projects, getProject } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Harsh Khamkar`,
    description: project.description,
    keywords: [
      ...project.tags,
      "Data Scientist",
      "Machine Learning",
      "Case Study",
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
    <div className="min-h-screen bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className={`bg-gradient-to-b ${project.gradient} pb-px`}>
        <div className="bg-zinc-950/90 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-6 py-24">
            <Link
              href="/#projects"
              className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400"
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <h1 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-3 text-xl text-cyan-400">{project.subtitle}</p>
            <p className="mt-6 max-w-3xl text-lg text-zinc-400">{project.description}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {project.metrics.map((m) => (
                <Card key={m.label} className="text-center">
                  <p className="text-3xl font-bold text-cyan-400">{m.value}</p>
                  <p className="mt-1 text-sm text-zinc-500">{m.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white">Architecture</h2>
          <Card className="mt-6 font-mono text-sm text-zinc-400">
            <pre className="overflow-x-auto whitespace-pre">
{`┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Data Layer │ ──► │  ML Pipeline │ ──► │  Insights   │
│  SQL / ETL  │     │  ${project.technologies[0]?.padEnd(10) ?? "Python    "} │     │  Dashboard  │
└─────────────┘     └──────────────┘     └─────────────┘
       │                    │                    │
       ▼                    ▼                    ▼
   Raw Sources         Feature Store        Stakeholders`}
            </pre>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white">Technologies</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} className="border-cyan-500/20 bg-cyan-500/10 text-cyan-200">
                {tech}
              </Badge>
            ))}
          </div>
        </section>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Challenges", items: project.challenges },
            { title: "Solutions", items: project.solutions },
            { title: "Results", items: project.results },
          ].map((block) => (
            <section key={block.title}>
              <h2 className="text-xl font-bold text-white">{block.title}</h2>
              <ul className="mt-4 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-zinc-400">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
