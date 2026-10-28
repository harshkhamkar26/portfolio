import Link from "next/link";
import { siteConfig } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/50 py-12 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-zinc-500">{siteConfig.title}</p>
          <p className="mt-1 text-xs text-zinc-600">{siteConfig.location}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
          <Link href="#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </Link>
          <Link href="/resume" className="hover:text-cyan-400 transition-colors">
            Resume
          </Link>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} {siteConfig.name}. Crafted with precision.
        </p>
      </div>
    </footer>
  );
}
