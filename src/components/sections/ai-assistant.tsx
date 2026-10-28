"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send } from "lucide-react";

const responses: Record<string, string> = {
  default:
    "I'm Harsh's AI assistant. Ask me about his skills, projects, experience, or how to hire him!",
  skills:
    "Harsh specializes in Python, Machine Learning, SQL, Power BI, SHAP/XAI, forecasting, and business analytics. Proficiency across 6 core domains.",
  projects:
    "Featured projects include Student Performance XAI (SHAP), Financial Analytics Dashboard, Customer Segmentation ML, Sales Forecasting, and an AI Analytics Assistant.",
  experience:
    "Harsh interned at Choice India as Data & Business Analyst, and at One Globe Build Con LLP as Technology & Innovation Intern.",
  hire:
    "Harsh is open to Data Scientist, ML Engineer, and Analytics roles. Reach out via the contact section or download his ATS-optimized resume!",
  resume:
    "Visit the Resume & ATS page for keyword coverage, skills match visualization, and PDF download.",
};

function getResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("skill") || q.includes("tech")) return responses.skills;
  if (q.includes("project")) return responses.projects;
  if (q.includes("experience") || q.includes("intern")) return responses.experience;
  if (q.includes("hire") || q.includes("job") || q.includes("role")) return responses.hire;
  if (q.includes("resume") || q.includes("ats")) return responses.resume;
  return responses.default;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: responses.default },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [
      ...m,
      { role: "user", text: userMsg },
      { role: "bot", text: getResponse(userMsg) },
    ]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-cyan-500/30"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl backdrop-blur-2xl"
          >
            <div className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-4 py-3">
              <p className="font-semibold text-white">AI Assistant</p>
              <p className="text-xs text-zinc-500">Ask about Harsh&apos;s portfolio</p>
            </div>
            <div className="flex h-64 flex-col gap-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "ml-auto bg-cyan-500/20 text-cyan-100"
                      : "bg-white/5 text-zinc-300"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about skills, projects..."
                className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none"
              />
              <button
                onClick={send}
                className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 hover:bg-cyan-500/30"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
