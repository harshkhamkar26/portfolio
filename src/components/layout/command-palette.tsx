"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, FileText, Folder, Mail, BarChart3, X } from "lucide-react";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const commands = [
  { id: "home", label: "Go to Home", href: "/", icon: Search, group: "Navigation" },
  { id: "about", label: "About Section", href: "/#about", icon: Search, group: "Navigation" },
  { id: "projects", label: "View Projects", href: "/#projects", icon: Folder, group: "Navigation" },
  { id: "resume", label: "Resume & ATS", href: "/resume", icon: FileText, group: "Navigation" },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail, group: "Navigation" },
  { id: "lab", label: "AI & Analytics Lab", href: "/#lab", icon: BarChart3, group: "Navigation" },
  ...projects.map((p) => ({
    id: p.slug,
    label: p.title,
    href: `/projects/${p.slug}`,
    icon: Folder,
    group: "Projects",
  })),
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback(
    (href: string) => {
      onOpenChange(false);
      setQuery("");
      if (href.startsWith("/#")) {
        const el = document.querySelector(href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    },
    [onOpenChange, router]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        execute(filtered[selected].href);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [open, onOpenChange, filtered, selected, execute]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
              placeholder="Search commands, projects..."
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
              autoFocus
            />
            <Dialog.Close asChild>
              <button aria-label="Close">
                <X className="h-4 w-4 text-zinc-500" />
              </button>
            </Dialog.Close>
          </div>
          <ul className="max-h-72 overflow-y-auto py-2">
            {filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                    i === selected ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5"
                  )}
                  onClick={() => execute(cmd.href)}
                  onMouseEnter={() => setSelected(i)}
                >
                  <cmd.icon className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span>{cmd.label}</span>
                  <span className="ml-auto text-xs text-zinc-600">{cmd.group}</span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-zinc-500">
                No results found
              </li>
            )}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
