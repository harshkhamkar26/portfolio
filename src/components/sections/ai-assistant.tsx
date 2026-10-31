"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Terminal, ArrowUpRight, RotateCcw } from "lucide-react";
import { siteConfig, publications, experiences, certifications } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
  links?: { label: string; url: string; external?: boolean }[];
};

const SUGGESTED_PROMPTS = [
  "📄 Papers Under Review",
  "🎯 Harsh's Career Goals",
  "📊 Choice India Internship",
  "🧠 Core ML & XAI Stack",
  "🏀 Sports & Leadership",
  "💼 Why Hire Harsh?",
  "📬 Contact Details",
];

function generateResponse(rawInput: string): { text: string; links?: { label: string; url: string; external?: boolean }[] } {
  const q = rawInput.toLowerCase().trim();

  // 1. Papers & Research Under Review
  if (
    q.includes("paper") ||
    q.includes("research") ||
    q.includes("publication") ||
    q.includes("under review") ||
    q.includes("journal") ||
    q.includes("conference")
  ) {
    if (q.includes("student") || q.includes("svm") || q.includes("random forest")) {
      return {
        text: `📄 **Conference Paper (Under Review)**:\n\n“*SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression*”\n\n• **Core Methodology**: Benchmarked Random Forest, SVM, and Logistic Regression across secondary math and language cohorts.\n• **Zero Leakage**: Strictly eliminated downstream intermediate test marks to isolate true socio-academic and behavioral predictors (study habits, parental education, absences).\n• **Explainability**: Integrated TreeSHAP & KernelSHAP to generate actionable intervention blueprints for academic counselors.`,
        links: [
          { label: "Inspect Repository", url: "https://github.com/harshkhamkar26/Student_Performance_XAI", external: true },
          { label: "View in Depot", url: "#depot" },
        ],
      };
    }

    if (q.includes("hyperparameter") || q.includes("tabular") || q.includes("optuna") || q.includes("imbalance")) {
      return {
        text: `📑 **Journal Paper (Under Review)**:\n\n“*Explainable Hyperparameter Optimization for Imbalanced Tabular Classification*”\n\n• **Problem**: Tabular class imbalance causes severe model bias and black-box Bayesian search unpredictably alters feature attribution across trials.\n• **Framework**: Unifies Bayesian optimization with Optuna, SMOTE-NC resampling for mixed categorical/continuous data, and cost-sensitive classification thresholds.\n• **Attribution Auditing**: Uses TreeSHAP across optimization iterations to mathematically guarantee feature importance stability.`,
        links: [
          { label: "Inspect Repository", url: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI", external: true },
          { label: "View in Depot", url: "#depot" },
        ],
      };
    }

    return {
      text: `Harsh currently has **2 peer-reviewed research papers under review**:\n\n1. 📑 **Journal Paper – Under Review**:\n“*Explainable Hyperparameter Optimization for Imbalanced Tabular Classification*” (Optuna Bayesian Search · TreeSHAP · SMOTE-NC · Benchmark: UCI Bank Marketing).\n\n2. 📄 **Conference Paper – Under Review**:\n“*SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression*” (Multi-model benchmark · Zero-leakage behavioral attribution · Tree & Kernel SHAP).\n\nBoth submissions embody Harsh's engineering philosophy: building transparent, auditable AI rather than opaque black-boxes.`,
      links: [
        { label: "Explore Depot & Blueprints", url: "#depot" },
        { label: "View GitHub Repositories", url: siteConfig.github, external: true },
      ],
    };
  }

  // 2. Career Goals & Ambition
  if (
    q.includes("goal") ||
    q.includes("career") ||
    q.includes("future") ||
    q.includes("vision") ||
    q.includes("aspire") ||
    q.includes("objective")
  ) {
    return {
      text: `🎯 **Harsh's Professional Goals & Vision**:\n\n• **Immediate Target**: Secure a high-impact engineering role as a **Data Science Engineer**, **Machine Learning Researcher**, or **Analytics Engineer** where he can build scalable pipelines and transparent ML models.\n• **Technical Specialty**: Championing **Explainable AI (XAI)** and reliable data architectures that move enterprise systems past opaque black-boxes toward auditable, cost-sensitive intelligence.\n• **Leadership Trajectory**: Combining corporate data engineering discipline (handling 128k+ records at Choice India) with championship varsity athletic stamina to lead cross-functional AI teams.`,
      links: [
        { label: "Download Verified Resume", url: "/resume.pdf", external: true },
        { label: "Connect on LinkedIn", url: siteConfig.linkedin, external: true },
      ],
    };
  }

  // 3. Why Hire Harsh / Differentiator
  if (
    q.includes("hire") ||
    q.includes("why") ||
    q.includes("fit") ||
    q.includes("candidate") ||
    q.includes("strength") ||
    q.includes("different")
  ) {
    return {
      text: `💡 **Top 4 Reasons Harsh Stands Out**:\n\n1. **Proven Corporate Scale**: Already preprocessed 128,000+ enterprise records and engineered 11+ active Power BI / Zoho Analytics dashboards at Choice India.\n2. **Academic & Research Rigor**: Authored 2 peer-reviewed papers (Journal & Conference) currently under review in Explainable AI and Bayesian optimization.\n3. **Full-Stack ML Engineering**: Fluent in the entire lifecycle — from raw SQL data cleansing and Kafka streams to Scikit-Learn/PyTorch training and Next.js full-stack deployments.\n4. **Elite Composure & Stamina**: Sports Club President & National/State Basketball Athlete — bringing decisive communication, composure, and relentless drive to high-stakes sprints.`,
      links: [
        { label: "Inspect Verified ATS Resume", url: "/resume" },
        { label: "Contact for Interview", url: `mailto:${siteConfig.email}?subject=Interview%20Inquiry%20-%20Harsh%20Khamkar`, external: true },
      ],
    };
  }

  // 4. Experience & Choice India Internship
  if (
    q.includes("choice") ||
    q.includes("intern") ||
    q.includes("experience") ||
    q.includes("job") ||
    q.includes("one globe") ||
    q.includes("work")
  ) {
    return {
      text: `💼 **Industry Work Experience**:\n\n1. **Choice India (The Joy of Earning)** — *Data Analyst & Business Analyst Intern (May 2026 – Present)*:\n• Analyzed 128,000+ verified enterprise financial and travel records.\n• Built 11+ automated Power BI dashboards and Zoho Analytics reports for executive C-suite visibility.\n• Optimized SQL query routines, cutting manual reporting overhead by 40%.\n• Assisted in WhatsApp messaging automation pipelines via AiSensy.\n\n2. **One Globe Build Con LLP** — *Technology & Innovation Division Intern (Apr–Jul 2025)*:\n• Engineered modular React.js frontends and Scikit-learn supervised learning workflows.\n• Built visual telemetry dashboards with Pandas, Matplotlib, and Excel.\n\n3. **Universal AI University SMART Project** — *Head of Operations & Field Researcher (Jan 2025 – Present)*:\n• Led 30+ students in rural educational tech integration surveys.`,
      links: [
        { label: "Timeline Journey", url: "#expedition" },
        { label: "View Detailed Resume", url: "/resume" },
      ],
    };
  }

  // 5. Tech Stack & Skills
  if (
    q.includes("skill") ||
    q.includes("stack") ||
    q.includes("tech") ||
    q.includes("python") ||
    q.includes("sql") ||
    q.includes("power bi") ||
    q.includes("pytorch") ||
    q.includes("language") ||
    q.includes("tools")
  ) {
    return {
      text: `🛠️ **Harsh's Technical Arsenal**:\n\n• **Languages**: Python (NumPy, Pandas, Scikit-learn, PyTorch), SQL, C++, TypeScript, HTML5/CSS3, Java.\n• **Machine Learning & XAI**: TreeSHAP, KernelSHAP, Optuna Bayesian Search, SMOTE-NC, Random Forest, SVM, Logistic Regression, Deepfake Detection.\n• **Business Intelligence**: Power BI (11+ Dashboards, complex DAX, star schemas), Zoho Analytics, Excel VBA Automation.\n• **Big Data & Systems**: Apache Kafka, Hadoop Ecosystem, RESTful APIs, Star Schema ETL.\n• **Full-Stack & Web**: Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js / WebGL.`,
      links: [
        { label: "Review 5 Tracks", url: "#tracks" },
        { label: "Inspect ATS Keyword Matrix", url: "#about" },
      ],
    };
  }

  // 6. Sports & Basketball Leadership
  if (
    q.includes("sport") ||
    q.includes("basket") ||
    q.includes("athlete") ||
    q.includes("president") ||
    q.includes("leadership") ||
    q.includes("rush4rush")
  ) {
    return {
      text: `🏀 **Athletic Excellence & Executive Leadership**:\n\n• **President — UAI Sports Club (2025–26)**: Directing all campus-wide athletic championships, committee operations, and university tournament leagues.\n• **National & State Level Basketball Athlete**: 1st Prize Winner in Inter-College Basketball Championship. Harsh attributes his high-pressure engineering composure, split-second tactical thinking, and relentless stamina directly to varsity basketball.\n• **Event Head — Rush4Rush Intercollege Fest**: Directed operations, stage management, marketing, and logistics for 1,000+ attendees.`,
      links: [
        { label: "View Matrix & Honors", url: "#matrix" },
      ],
    };
  }

  // 7. Contact, Email, LinkedIn, Phone
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("linkedin") ||
    q.includes("reach") ||
    q.includes("location") ||
    q.includes("message")
  ) {
    return {
      text: `📬 **Direct Contact Channels for Harsh Khamkar**:\n\n• **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n• **LinkedIn**: [linkedin.com/in/harsh-khamkar-b4a54a32a](${siteConfig.linkedin})\n• **GitHub**: [github.com/harshkhamkar26](${siteConfig.github})\n• **Phone**: ${siteConfig.phone}\n• **Location**: Mumbai, Maharashtra, India (Available for On-site & Remote worldwide).`,
      links: [
        { label: "Open LinkedIn Profile", url: siteConfig.linkedin, external: true },
        { label: "Send Email Directly", url: `mailto:${siteConfig.email}?subject=Opportunity%20via%20Portfolio`, external: true },
      ],
    };
  }

  // 8. Education & University
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("degree") ||
    q.includes("btech") ||
    q.includes("gpa")
  ) {
    return {
      text: `🎓 **Education Profile**:\n\n• **Institution**: Universal AI University, Mumbai, India.\n• **Degree**: B.Tech in Artificial Intelligence, Machine Learning & Data Science (2024–2028).\n• **Specialization**: Statistical Learning, Neural Architectures, Big Data Systems, Explainable AI, and Business Intelligence.`,
      links: [
        { label: "View Profile & Bio", url: "#about" },
      ],
    };
  }

  // 9. Resume & ATS
  if (q.includes("resume") || q.includes("cv") || q.includes("download") || q.includes("ats") || q.includes("pdf")) {
    return {
      text: `📄 **Official ATS-Optimized Resume**:\n\nHarsh's verified resume is calibrated for enterprise ATS scanners with 98% keyword alignment across Python, SQL, Power BI, and Explainable AI. You can view the live interactive web breakdown or download the clean PDF directly.`,
      links: [
        { label: "Download Resume PDF", url: "/resume.pdf", external: true },
        { label: "View Interactive ATS Page", url: "/resume" },
      ],
    };
  }

  // 10. Greetings
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q === "yo" || q.includes("morning") || q.includes("evening")) {
    return {
      text: `Hello! I'm **HK-AI CORE**, Harsh Khamkar's personal portfolio assistant. I can give you instant insight into his **2 peer-reviewed research papers under review**, his **Choice India enterprise internship (128K+ records)**, his **core ML & BI tech stack**, and his **career ambitions**. What would you like to know?`,
    };
  }

  // 11. Polite / Thanks
  if (q.includes("thank") || q.includes("great") || q.includes("cool") || q.includes("awesome") || q.includes("good")) {
    return {
      text: `You're very welcome! Harsh is always keen to discuss machine learning research, data science engineering, and collaborative projects. Feel free to shoot him an email or connect on LinkedIn!`,
      links: [
        { label: "Connect on LinkedIn", url: siteConfig.linkedin, external: true },
        { label: "Email Harsh", url: `mailto:${siteConfig.email}`, external: true },
      ],
    };
  }

  // Default Fallback
  return {
    text: `I'm Harsh Khamkar's AI Assistant. Harsh is a **Data Science Engineer & ML Researcher** at Universal AI University, interning at **Choice India (128K+ records & 11 Power BI dashboards)** with **2 peer-reviewed research papers under review**.\n\nYou can ask me about:\n• His 2 research papers under review (Journal & Conference)\n• His career goals & engineering vision\n• His Choice India & One Globe Build Con internships\n• His technical competencies (Python, SQL, SHAP, Power BI)\n• His sports leadership (Sports Club President, Basketball Athlete)\n• How to get in touch or hire him!`,
    links: [
      { label: "Explore Project Depot", url: "#depot" },
      { label: "Inspect Resume", url: "/resume" },
    ],
  };
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "bot",
      text: `Hello! I'm **HK-AI CORE**, Harsh Khamkar's interactive portfolio assistant.\n\nAsk me anything about Harsh's **2 research papers under review**, his **128K+ row data internship at Choice India**, his **career goals**, or his **core ML stack**!`,
      time: "ONLINE",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping]);

  const handleSend = (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed) return;

    sounds.playClick();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: trimmed, time: now },
    ]);
    setInput("");
    setIsTyping(true);

    // Natural responsive delay
    setTimeout(() => {
      const response = generateResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response.text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          links: response.links,
        },
      ]);
      setIsTyping(false);
      sounds.playSwitch();
    }, 450);
  };

  const handleClear = () => {
    sounds.playClick();
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: "bot",
        text: `Terminal history reset. What would you like to explore regarding Harsh's portfolio or research?`,
        time: "READY",
      },
    ]);
  };

  return (
    <>
      {/* Floating Tactical Launcher Pill / Button */}
      <motion.button
        onClick={() => {
          sounds.playClick();
          setOpen(!open);
        }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 border-2 border-[#ff6a1a] bg-[#16181c] px-3.5 py-2.5 shadow-[0_0_24px_rgba(255,106,26,0.35)] transition-all hover:bg-[#ff6a1a] text-[#ece5d5] hover:text-[#16181c]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle AI Assistant"
      >
        <div className="relative flex h-6 w-6 items-center justify-center rounded-sm bg-[#ff6a1a]/20 text-[#ff6a1a] group-hover:text-[#16181c]">
          {open ? <X size={16} /> : <Bot size={16} />}
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f] animate-ping" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f]" />
        </div>
        <div className="flex flex-col text-left font-mono">
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {open ? "CLOSE HUD" : "HK-AI COPILOT"}
          </span>
          <span className="text-[9px] text-[#9dfc3f] font-semibold">
            {open ? "DISPATCH READY" : "ASK QUESTIONS"}
          </span>
        </div>
      </motion.button>

      {/* Cyber AI Terminal Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] sm:max-h-[640px] flex flex-col border-2 border-[#ece5d5]/25 bg-[#14161a] shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl overflow-hidden font-mono text-xs"
          >
            {/* Header Window Bar */}
            <div className="flex items-center justify-between border-b border-[#ece5d5]/15 bg-[#1a1c22] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-sm border border-[#ff6a1a]/50 bg-[#ff6a1a]/15 text-[#ff6a1a]">
                  <Terminal size={12} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-white">
                      HK-AI COPILOT
                    </span>
                    <span className="border border-[#9dfc3f]/40 bg-[#9dfc3f]/10 px-1.5 py-0.2 text-[9px] text-[#9dfc3f] font-bold uppercase">
                      v2026.4
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50">Harsh Khamkar · Portfolio Intelligence</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClear}
                  title="Reset conversation"
                  className="p-1.5 text-white/50 hover:text-white transition"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setOpen(false);
                  }}
                  className="p-1.5 text-white/50 hover:text-[#ff6a1a] transition"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Quick Suggested Prompt Chips */}
            <div className="border-b border-white/10 bg-[#121316] px-3 py-2 overflow-x-auto no-scrollbar">
              <div className="flex gap-1.5 whitespace-nowrap">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="border border-white/15 bg-black/40 px-2 py-1 text-[10px] text-white/70 hover:border-[#ff6a1a] hover:text-white transition shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[380px] bg-[#101215]">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[9px] text-white/40">
                      <span>{isUser ? "VISITOR" : "HK-COPILOT"}</span>
                      <span>·</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[88%] p-3 border leading-relaxed ${
                        isUser
                          ? "border-[#ff6a1a]/60 bg-[#ff6a1a]/15 text-white"
                          : "border-white/15 bg-[#181a20] text-[#ece5d5]/90"
                      }`}
                    >
                      <div className="whitespace-pre-line text-[11px] sm:text-xs">
                        {msg.text}
                      </div>

                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                          {msg.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target={link.external ? "_blank" : undefined}
                              rel={link.external ? "noopener noreferrer" : undefined}
                              onClick={() => sounds.playClick()}
                              className="inline-flex items-center gap-1 border border-[#9dfc3f]/50 bg-[#9dfc3f]/10 px-2 py-1 text-[10px] font-bold text-[#9dfc3f] hover:bg-[#9dfc3f] hover:text-[#16181c] transition"
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight size={11} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-[10px] pl-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a1a] animate-ping" />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="border-t border-[#ece5d5]/15 bg-[#16181c] p-2.5 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about papers, goals, internships..."
                className="flex-1 border border-white/15 bg-[#101215] px-3 py-2 text-xs text-white placeholder-white/35 focus:border-[#ff6a1a] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center border border-[#ff6a1a] bg-[#ff6a1a] text-[#16181c] disabled:opacity-40 disabled:border-white/10 disabled:bg-white/5 disabled:text-white/30 transition hover:bg-transparent hover:text-[#ff6a1a]"
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
