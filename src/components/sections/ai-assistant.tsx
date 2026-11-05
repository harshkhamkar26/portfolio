"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Terminal,
  ArrowUpRight,
  RotateCcw,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Compass,
  Check,
  Copy,
  ChevronDown,
} from "lucide-react";
import { siteConfig, stationStops } from "@/lib/data/site";
import { sounds } from "@/components/layout/sound-manager";

type Message = {
  id: string;
  role: "user" | "bot";
  text: string;
  time: string;
  links?: { label: string; url: string; external?: boolean; isStationJump?: boolean }[];
  followUps?: string[];
};

const SUGGESTED_PROMPTS = [
  "📈 AI Portfolio Analytics Agent",
  "📄 2 Papers Under Review",
  "📊 Choice India (128K+ Rows)",
  "🎯 Harsh's Career Goals",
  "🧠 Core ML & XAI Stack",
  "💼 Why Hire Harsh for PL Capital?",
  "📥 1-Click ATS Resume",
  "🚂 Cruise to Station 03 (Flagship)",
  "📬 Direct Contact Details",
];

function generateResponse(rawInput: string): {
  text: string;
  links?: { label: string; url: string; external?: boolean; isStationJump?: boolean }[];
  followUps?: string[];
} {
  const q = rawInput.toLowerCase().trim();

  // Station Jump Commands
  if (q.includes("cruise") || q.includes("station") || q.includes("jump") || q.includes("go to") || q.includes("take me to")) {
    if (q.includes("origin") || q.includes("01") || q.includes("hero")) {
      return {
        text: `🚂 **Station 01: ORIGIN (Hero Terminal)**\n\nReturning to the main platform. Harsh Khamkar is a **Data Science Engineer** and **Machine Learning Researcher** at Universal AI University, Mumbai with 2 research papers under review.`,
        links: [{ label: "Cruise to Origin", url: "#hero", isStationJump: true }],
        followUps: ["📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)"],
      };
    }
    if (q.includes("track") || q.includes("02") || q.includes("domain")) {
      return {
        text: `⚡ **Station 02: TRACKS (5 Core Domains)**\n\nCruising to Harsh's 5 technical engineering tracks: Predictive ML, Explainable AI (SHAP), Enterprise Analytics (Power BI), Big Data Engineering, and Full-Stack Next.js.`,
        links: [{ label: "Cruise to Tracks", url: "#tracks", isStationJump: true }],
        followUps: ["🧠 Core ML & XAI Stack", "📊 Choice India (128K+ Rows)"],
      };
    }
    if (q.includes("wheel") || q.includes("03") || q.includes("cylinder") || q.includes("3d")) {
      return {
        text: `🎡 **Station 03: 3D CYLINDER WHEEL**\n\nFull throttle to Station 03! Featuring the interactive 3D WebGL orbit showcase of Harsh's flagship projects with drag & physics momentum.`,
        links: [{ label: "Cruise to 3D Wheel", url: "#showcase", isStationJump: true }],
        followUps: ["📄 2 Papers Under Review", "💼 Why Hire Harsh?"],
      };
    }
    if (q.includes("depot") || q.includes("04") || q.includes("project")) {
      return {
        text: `📦 **Station 04: PROJECT DEPOT**\n\nArriving at Station 04! Here you can explore Harsh's 2 peer-reviewed research papers (Journal & Conference), interactive technical blueprints, and live GitHub API sync.`,
        links: [{ label: "Cruise to Depot", url: "#depot", isStationJump: true }],
        followUps: ["📄 2 Papers Under Review", "📥 1-Click ATS Resume"],
      };
    }
    if (q.includes("profile") || q.includes("05") || q.includes("about") || q.includes("arsenal")) {
      return {
        text: `👤 **Station 05: PROFILE & ARSENAL**\n\nCruising to Station 05! Detailed dossier on Harsh Khamkar, B.Tech AI/ML at Universal AI University (CGPA: 8.17), verified keyword matrix, and core competencies.`,
        links: [{ label: "Cruise to Profile", url: "#about", isStationJump: true }],
        followUps: ["🎯 Harsh's Career Goals", "🏀 Basketball & Leadership"],
      };
    }
    if (q.includes("journey") || q.includes("06") || q.includes("expedition") || q.includes("timeline")) {
      return {
        text: `🗺️ **Station 06: EXPEDITION (Experience Log)**\n\nNext stop: Station 06! The chronological timeline covering Choice India (128K+ records), One Globe Build Con, and the SMART Project field leadership.`,
        links: [{ label: "Cruise to Journey", url: "#expedition", isStationJump: true }],
        followUps: ["📊 Choice India (128K+ Rows)", "📥 1-Click ATS Resume"],
      };
    }
    if (q.includes("matrix") || q.includes("07") || q.includes("cert") || q.includes("sport")) {
      return {
        text: `🏆 **Station 07: COMPETENCY MATRIX**\n\nArriving at Station 07! Review verified certifications, hackathon commendations, and varsity basketball championship honors.`,
        links: [{ label: "Cruise to Matrix", url: "#matrix", isStationJump: true }],
        followUps: ["🏀 Basketball & Leadership", "📬 Direct Contact Details"],
      };
    }
    if (q.includes("terminal") || q.includes("08") || q.includes("comms") || q.includes("dispatch")) {
      return {
        text: `📟 **Station 08: COMMS DISPATCH**\n\nCruising to Terminus Station 08! Featuring direct communication channels and the interactive CLI bash terminal.`,
        links: [{ label: "Cruise to Comms", url: "#terminal", isStationJump: true }],
        followUps: ["📬 Direct Contact Details", "📥 1-Click ATS Resume"],
      };
    }
  }

  // Financial AI & PL Capital Technical Assessment
  if (
    q.includes("portfolio") ||
    q.includes("pl capital") ||
    q.includes("financial") ||
    q.includes("sql safety") ||
    q.includes("sector exposure") ||
    q.includes("nl to sql") ||
    q.includes("sqlite") ||
    q.includes("assessment")
  ) {
    return {
      text: `📈 **AI Portfolio Analytics Agent [PL Capital Technical Assessment]**:\n\n• **Core Purpose**: Evidence-grounded natural-language query engine for multi-asset equity portfolios.\n• **Natural-Language-to-SQL**: Converts investor inquiries into validated SQL queries over normalized SQLite schemas.\n• **AST Read-Only Safeguards**: Parses query Abstract Syntax Trees to strictly enforce SELECT statements and block mutation tokens (DROP, UPDATE, DELETE).\n• **Deterministic Calculations**: Routes mathematical calculations to Python numerical routines, eliminating LLM arithmetic hallucination.\n• **Ground-Truth Evaluation**: Benchmarked across syntactic validity, safety adherence, and financial parity.\n• **Status**: Prototype / Technical Assessment in progress.`,
      links: [
        { label: "Launch Financial AI Demo", url: "#financial-demo", isStationJump: true },
        { label: "Inspect GitHub Repository", url: "https://github.com/harshkhamkar26/AI-Portfolio-Analytics-Agent", external: true },
      ],
      followUps: ["Explain SQL Safety Safeguards", "📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)"],
    };
  }

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
        text: `📄 **Conference Paper (Under Review)**:\n\n“*SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression*”\n\n• **Core Benchmark**: Random Forest, SVM, and Logistic Regression across secondary math and language cohorts.\n• **Zero Leakage**: Strictly eliminated downstream intermediate marks to isolate true socio-academic predictors (study habits, parental education, absences).\n• **Counselor Actionability**: TreeSHAP & KernelSHAP attribution matrices generate actionable academic intervention blueprints.`,
        links: [
          { label: "Cruise to Project Depot", url: "#depot", isStationJump: true },
          { label: "Inspect GitHub Repository", url: "https://github.com/harshkhamkar26/Student_Performance_XAI", external: true },
        ],
        followUps: ["Explain the Journal Paper", "📊 Choice India (128K+ Rows)", "📥 1-Click ATS Resume"],
      };
    }

    if (q.includes("hyperparameter") || q.includes("tabular") || q.includes("optuna") || q.includes("imbalance")) {
      return {
        text: `📑 **Journal Paper (Under Review)**:\n\n“*Explainable Hyperparameter Optimization for Imbalanced Tabular Classification*”\n\n• **Problem**: Class imbalance in tabular classification introduces severe model bias, while black-box Bayesian search unpredictably distorts feature importance.\n• **Framework**: Integrates Optuna Bayesian optimization, SMOTE-NC mixed categorical resampling, and cost-sensitive thresholds.\n• **Attribution Stability**: Uses TreeSHAP across optimization trials to audit and guarantee feature importance stability.`,
        links: [
          { label: "Cruise to Project Depot", url: "#depot", isStationJump: true },
          { label: "Inspect GitHub Repository", url: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI", external: true },
        ],
        followUps: ["Explain the Conference Paper", "🧠 Core ML & XAI Stack", "📥 1-Click ATS Resume"],
      };
    }

    return {
      text: `Harsh currently has **2 peer-reviewed research papers under review**:\n\n1. 📑 **Journal Paper – Under Review**:\n“*Explainable Hyperparameter Optimization for Imbalanced Tabular Classification*” (Optuna Bayesian Search · TreeSHAP · SMOTE-NC · Benchmark: UCI Bank Marketing).\n\n2. 📄 **Conference Paper – Under Review**:\n“*SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression*” (Multi-model benchmark · Zero-leakage behavioral attribution · Tree & Kernel SHAP).\n\nBoth papers reflect Harsh's core philosophy: building transparent, auditable AI systems rather than opaque black boxes.`,
      links: [
        { label: "Cruise to Station 04 (Depot)", url: "#depot", isStationJump: true },
        { label: "GitHub Repositories", url: siteConfig.github, external: true },
      ],
      followUps: ["Tell me about Choice India", "🎯 Harsh's Career Goals", "📥 1-Click ATS Resume"],
    };
  }

  // 2. Choice India Internship & 128K+ Records
  if (
    q.includes("choice") ||
    q.includes("intern") ||
    q.includes("128") ||
    q.includes("dashboard") ||
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("one globe")
  ) {
    return {
      text: `💼 **Industry Work Experience & Enterprise Scale**:\n\n1. **Choice India (The Joy of Earning)** — *Data Analyst & Business Analyst Intern (18 May 2026 – 18 July 2026)*:\n• Preprocessed and cleansed **128,000+ enterprise financial and travel records** across Choice FinX, Choice Business, Choice Connect, GIC, GFC, and MakeMyTrip.\n• Engineered **11+ interactive Power BI dashboards** and Zoho Analytics reports for executive C-suite operations.\n• Optimized SQL query routines, slashing manual reporting overhead by **40%**.\n• Automated WhatsApp messaging campaigns via AiSensy.\n\n2. **One Globe Build Con LLP** — *Tech & Innovation Division Intern (Apr–Jul 2025)*:\n• Built modular React.js frontends and Scikit-learn supervised learning pipelines.\n• Engineered telemetry dashboards with Pandas, Matplotlib, and Excel VBA.`,
      links: [
        { label: "Cruise to Station 06 (Journey)", url: "#expedition", isStationJump: true },
        { label: "Download Verified Resume", url: "/resume.pdf", external: true },
      ],
      followUps: ["📄 2 Papers Under Review", "💼 Why Hire Harsh?", "🧠 Core ML & XAI Stack"],
    };
  }

  // 3. Career Goals & Ambition
  if (
    q.includes("goal") ||
    q.includes("career") ||
    q.includes("future") ||
    q.includes("vision") ||
    q.includes("aspire") ||
    q.includes("objective")
  ) {
    return {
      text: `🎯 **Harsh's Professional Goals & Vision**:\n\n• **Immediate Target**: Excel as a **Data Science Engineer**, **Machine Learning Researcher**, or **Analytics Engineer** where he can build high-throughput data pipelines and transparent, explainable ML models.\n• **Technical Specialty**: Spearheading **Explainable AI (XAI)** in enterprise settings — replacing opaque black-box decisions with auditable, cost-sensitive intelligence.\n• **Leadership Trajectory**: Fusing corporate data engineering rigor (128K+ records at Choice India) with varsity athletic stamina (Sports Club President, Basketball Athlete) to lead high-velocity engineering teams.`,
      links: [
        { label: "Cruise to Station 05 (Profile)", url: "#about", isStationJump: true },
        { label: "Download 1-Page ATS Resume", url: "/resume.pdf", external: true },
      ],
      followUps: ["💼 Why Hire Harsh?", "📄 2 Papers Under Review", "📬 Direct Contact Details"],
    };
  }

  // 4. Why Hire Harsh
  if (
    q.includes("hire") ||
    q.includes("why") ||
    q.includes("fit") ||
    q.includes("candidate") ||
    q.includes("strength") ||
    q.includes("differentiator")
  ) {
    return {
      text: `💡 **Top 4 Reasons Harsh Stands Out**:\n\n1. **Proven Corporate Scale**: Already cleansed 128,000+ enterprise records and built 11+ automated Power BI / Zoho dashboards at Choice India.\n2. **Academic & Research Rigor**: Authored 2 peer-reviewed papers (Journal & Conference under review) in Explainable AI and Bayesian optimization.\n3. **Full-Lifecycle ML Engineering**: Fluent from raw SQL ETL cleansing and Kafka streams to Scikit-learn/PyTorch model training and Next.js full-stack deployments.\n4. **Elite Leadership & Composure**: President of UAI Sports Club & National/State Basketball Player — bringing split-second composure and championship drive to sprint deadlines.`,
      links: [
        { label: "Download Verified ATS Resume", url: "/resume.pdf", external: true },
        { label: "Schedule an Interview", url: `mailto:${siteConfig.email}?subject=Interview%20Inquiry%20-%20Harsh%20Khamkar`, external: true },
      ],
      followUps: ["📊 Choice India (128K+ Rows)", "📄 2 Papers Under Review", "📬 Direct Contact Details"],
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
    q.includes("tools")
  ) {
    return {
      text: `🛠️ **Harsh's Technical Arsenal**:\n\n• **Languages**: Python (NumPy, Pandas, Scikit-learn, PyTorch), SQL, C++, TypeScript, HTML5/CSS3, Java.\n• **Machine Learning & XAI**: TreeSHAP, KernelSHAP, Optuna Bayesian Search, SMOTE-NC, Random Forest, SVM, Logistic Regression, Deepfake Detection.\n• **Business Intelligence**: Power BI (11+ Dashboards, Star Schema, DAX), Zoho Analytics, Excel VBA Automation.\n• **Data Engineering**: Apache Kafka, Hadoop Ecosystem, RESTful APIs, Star Schema ETL.\n• **Full-Stack Web**: Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Three.js / WebGL.`,
      links: [
        { label: "Cruise to Station 02 (Tracks)", url: "#tracks", isStationJump: true },
        { label: "Inspect Keyword Matrix", url: "#about", isStationJump: true },
      ],
      followUps: ["📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)", "📥 1-Click ATS Resume"],
    };
  }

  // 6. Sports & Leadership
  if (
    q.includes("sport") ||
    q.includes("basket") ||
    q.includes("athlete") ||
    q.includes("president") ||
    q.includes("leadership")
  ) {
    return {
      text: `🏀 **Athletic Excellence & Varsity Leadership**:\n\n• **President — UAI Sports Club (2025–26)**: Leading campus-wide athletic championships, student committees, and tournament logistics for 1,000+ athletes.\n• **National & State Level Basketball Athlete**: 1st Prize Winner in Inter-College Basketball Championship. Harsh credits his fast-paced engineering problem solving, split-second tactical vision, and composure under pressure to competitive basketball.\n• **Event Head — Rush4Rush Intercollege Fest**: Directed stage operations, sponsorships, and technical logistics.`,
      links: [
        { label: "Cruise to Station 07 (Matrix)", url: "#matrix", isStationJump: true },
      ],
      followUps: ["🎯 Harsh's Career Goals", "💼 Why Hire Harsh?", "📬 Direct Contact Details"],
    };
  }

  // 7. Contact Details
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("linkedin") ||
    q.includes("reach") ||
    q.includes("location")
  ) {
    return {
      text: `📬 **Direct Coordinates for Harsh Khamkar**:\n\n• **Email**: [${siteConfig.email}](mailto:${siteConfig.email})\n• **LinkedIn**: [linkedin.com/in/harsh-khamkar-b4a54a32a](${siteConfig.linkedin})\n• **GitHub**: [github.com/harshkhamkar26](${siteConfig.github})\n• **Phone**: ${siteConfig.phone}\n• **Location**: Mumbai, Maharashtra, India (Available for on-site & remote global opportunities).`,
      links: [
        { label: "Cruise to Station 08 (Comms)", url: "#terminal", isStationJump: true },
        { label: "Send Email Directly", url: `mailto:${siteConfig.email}?subject=Opportunity%20via%20Portfolio`, external: true },
      ],
      followUps: ["📥 1-Click ATS Resume", "💼 Why Hire Harsh?", "📄 2 Papers Under Review"],
    };
  }

  // 8. Education
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("university") ||
    q.includes("cgpa") ||
    q.includes("btech")
  ) {
    return {
      text: `🎓 **Academic Credentials**:\n\n• **Institution**: Universal AI University, Mumbai, India.\n• **Degree**: B.Tech in Artificial Intelligence, Machine Learning & Data Science (Expected 2028).\n• **Academic Standing**: **CGPA: 8.17**.\n• **Specialization**: Explainable AI, Statistical Learning, Enterprise Data Pipelines, Bayesian Optimization.`,
      links: [
        { label: "Cruise to Station 05 (Profile)", url: "#about", isStationJump: true },
        { label: "Download Verified Resume", url: "/resume.pdf", external: true },
      ],
      followUps: ["📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)", "🎯 Harsh's Career Goals"],
    };
  }

  // 9. Resume & ATS
  if (q.includes("resume") || q.includes("cv") || q.includes("download") || q.includes("ats") || q.includes("pdf")) {
    return {
      text: `📥 **Verified 1-Page ATS Resume**:\n\nHarsh's official resume is tailored for technical recruiters and ATS algorithms with 98% keyword calibration across Python, SQL, Power BI, and Explainable AI. You can download the PDF directly right here:`,
      links: [
        { label: "Download 1-Page ATS Resume (PDF)", url: "/resume.pdf", external: true },
        { label: "Cruise to Station 08 (Comms)", url: "#terminal", isStationJump: true },
      ],
      followUps: ["💼 Why Hire Harsh?", "📊 Choice India (128K+ Rows)", "📬 Direct Contact Details"],
    };
  }

  // 10. Greetings
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q === "yo" || q.includes("morning") || q.includes("evening")) {
    return {
      text: `All aboard! 🚂 Welcome to **The Portfolio Express**! I'm **CONDUCTOR AI**, Harsh Khamkar's chief dispatcher.\n\nI can answer questions regarding Harsh's **2 peer-reviewed research papers under review**, his **Choice India enterprise internship (128K+ records & 11 dashboards)**, his **core ML stack**, or cruise you directly to any of the 8 stations on the portfolio! What would you like to inspect?`,
      followUps: ["📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)", "🎯 Harsh's Career Goals"],
    };
  }

  // Default Fallback
  return {
    text: `I'm **CONDUCTOR AI**, Harsh Khamkar's locomotive dispatch assistant. Harsh is a **Data Science Engineer & ML Researcher** at Universal AI University, interning at **Choice India (128K+ records & 11 Power BI dashboards)** with **2 peer-reviewed research papers under review**.\n\nTry clicking any of the prompts below or ask me to cruise to any station!`,
    links: [
      { label: "Cruise to Station 04 (Depot)", url: "#depot", isStationJump: true },
      { label: "Download 1-Page ATS Resume", url: "/resume.pdf", external: true },
    ],
    followUps: ["📄 2 Papers Under Review", "📊 Choice India (128K+ Rows)", "💼 Why Hire Harsh?"],
  };
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showStationMenu, setShowStationMenu] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      role: "bot",
      text: `All aboard! 🚂 I'm **CONDUCTOR AI**, the chief locomotive dispatcher for *The Portfolio Express* and Harsh Khamkar's personal intelligence agent.\n\nAsk me about Harsh's **2 research papers under review**, his **128K+ row enterprise analytics at Choice India**, his **career vision**, or click any button to cruise directly to a station!`,
      time: "ONLINE",
      followUps: [
        "📄 2 Papers Under Review",
        "📊 Choice India (128K+ Rows)",
        "🎯 Harsh's Career Goals",
        "💼 Why Hire Harsh?",
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chipScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages or typing state changes
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping]);

  const handleMessagesScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    setIsScrolledUp(scrollHeight - scrollTop - clientHeight > 60);
  };

  const scrollChips = (direction: "left" | "right") => {
    sounds.playClick();
    if (chipScrollRef.current) {
      const offset = direction === "left" ? -220 : 220;
      chipScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const jumpToStation = (id: string, name: string) => {
    sounds.playWhistle();
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: { offset?: number }) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -60 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setShowStationMenu(false);

    // Announce cruise in chat
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        text: `Cruise to ${name}`,
        time: now,
      },
      {
        id: `bot-${Date.now() + 1}`,
        role: "bot",
        text: `🚂 Throttle engaged! Cruising directly to **${name}**! Enjoy exploring this section of The Portfolio Express.`,
        time: now,
      },
    ]);
  };

  const handleCopyMessage = (text: string, id: string) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
          followUps: response.followUps,
        },
      ]);
      setIsTyping(false);
      sounds.playSwitch();
    }, 400);
  };

  const handleClear = () => {
    sounds.playClick();
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: "bot",
        text: `🚂 Dispatch history reset. What would you like to explore regarding Harsh's portfolio, 2 research papers under review, or Choice India internship?`,
        time: "READY",
        followUps: [
          "📄 2 Papers Under Review",
          "📊 Choice India (128K+ Rows)",
          "🎯 Harsh's Career Goals",
        ],
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
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 border-2 border-[#ff6a1a] bg-[#16181c] px-3.5 py-2.5 shadow-[0_0_24px_rgba(255,106,26,0.4)] transition-all hover:bg-[#ff6a1a] text-[#ece5d5] hover:text-[#16181c] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Toggle CONDUCTOR AI Assistant"
      >
        <div className="relative flex h-6 w-6 items-center justify-center rounded-sm bg-[#ff6a1a]/20 text-[#ff6a1a] group-hover:text-[#16181c]">
          {open ? <X size={16} /> : <Compass size={16} />}
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f] animate-ping" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#9dfc3f]" />
        </div>
        <div className="flex flex-col text-left font-mono">
          <span className="text-[11px] font-bold uppercase tracking-wider">
            {open ? "CLOSE DISPATCH" : "CONDUCTOR AI"}
          </span>
          <span className="text-[9px] text-[#9dfc3f] font-semibold">
            {open ? "STATION DOCKED" : "CHIEF DISPATCHER"}
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
            className="fixed bottom-20 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[450px] max-h-[85vh] sm:max-h-[660px] flex flex-col border-2 border-[#ece5d5]/25 bg-[#121418] shadow-[0_20px_60px_rgba(0,0,0,0.92)] backdrop-blur-2xl overflow-hidden font-mono text-xs"
          >
            {/* Header Window Bar */}
            <div className="flex items-center justify-between border-b border-[#ece5d5]/15 bg-[#16181f] px-3.5 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#ff6a1a]/60 bg-[#ff6a1a]/20 text-[#ff6a1a]">
                  <Compass size={14} />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-xs uppercase tracking-wider text-white">
                      CONDUCTOR AI
                    </span>
                    <span className="border border-[#ffd23a]/50 bg-[#ffd23a]/15 px-1.5 py-0.2 text-[9px] text-[#ffd23a] font-bold uppercase">
                      CHIEF DISPATCHER
                    </span>
                  </div>
                  <p className="text-[10px] text-white/50">The Portfolio Express · Harsh Khamkar</p>
                </div>
              </div>

              {/* Header Action Tools */}
              <div className="flex items-center gap-1.5">
                {/* Steam Whistle Sound Blast Button */}
                <button
                  onClick={() => sounds.playWhistle()}
                  title="Blow Locomotive Steam Whistle"
                  className="flex items-center gap-1 border border-white/10 bg-black/40 px-2 py-1 text-[10px] text-[#ffd23a] hover:border-[#ffd23a] hover:bg-[#ffd23a]/15 transition cursor-pointer"
                >
                  <Volume2 size={12} />
                  <span className="hidden sm:inline">WHISTLE</span>
                </button>

                {/* Reset History */}
                <button
                  onClick={handleClear}
                  title="Reset conversation"
                  className="p-1.5 text-white/50 hover:text-white transition cursor-pointer"
                >
                  <RotateCcw size={13} />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    sounds.playClick();
                    setOpen(false);
                  }}
                  className="p-1.5 text-white/50 hover:text-[#ff6a1a] transition cursor-pointer"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Locomotive Station Cruise Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0d0f12] px-3 py-1.5 text-[10px]">
              <button
                onClick={() => setShowStationMenu(!showStationMenu)}
                className="flex items-center gap-1.5 text-[#ff6a1a] font-bold hover:underline cursor-pointer"
              >
                <Navigation size={11} />
                <span>CRUISE TO STATION...</span>
              </button>
              <span className="text-[#9dfc3f] font-mono text-[9px]">
                STEAM PRESSURE: 100%
              </span>
            </div>

            {/* Expandable Station Cruise Selector */}
            <AnimatePresence>
              {showStationMenu && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-white/10 bg-[#161820] p-2.5 grid grid-cols-2 gap-1.5"
                >
                  {stationStops.map((st) => (
                    <button
                      key={st.id}
                      onClick={() => jumpToStation(st.id, `Station ${st.no}: ${st.name}`)}
                      className="flex items-center gap-2 border border-white/10 bg-black/40 p-1.5 text-left text-[10px] hover:border-[#ff6a1a] hover:text-[#ff6a1a] transition cursor-pointer"
                    >
                      <span className="font-bold text-[#ffd23a]">{st.no}</span>
                      <span className="truncate text-white/80">{st.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Suggested Prompt Chips with Scrolling Arrows & Amber Scrollbar */}
            <div className="relative border-b border-white/10 bg-[#121316] flex items-center">
              {/* Left Scroll Button */}
              <button
                onClick={() => scrollChips("left")}
                className="h-full px-1.5 bg-[#16181f]/90 text-white/60 hover:text-white border-r border-white/10 z-10 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Scrollable Chips Strip with High-Visibility Amber Scrollbar */}
              <div
                ref={chipScrollRef}
                data-lenis-prevent
                className="flex gap-1.5 px-2 py-2 overflow-x-auto custom-scrollbar whitespace-nowrap scroll-smooth overscroll-contain"
              >
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] text-[#ece5d5]/80 hover:border-[#ff6a1a] hover:text-white hover:bg-[#ff6a1a]/15 transition shrink-0 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollChips("right")}
                className="h-full px-1.5 bg-[#16181f]/90 text-white/60 hover:text-white border-l border-white/10 z-10 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Message Feed with High-Visibility Amber Scrollbar */}
            <div
              ref={messagesContainerRef}
              onScroll={handleMessagesScroll}
              className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-3.5 max-h-[380px] sm:max-h-[420px] bg-[#0d0f12] relative overscroll-contain select-text" data-lenis-prevent
            >
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[9px] text-white/40">
                      <span>{isUser ? "PASSENGER" : "CONDUCTOR-AI"}</span>
                      <span>·</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[90%] p-3 border leading-relaxed relative group ${
                        isUser
                          ? "border-[#ff6a1a]/60 bg-[#ff6a1a]/15 text-white"
                          : "border-white/15 bg-[#15171d] text-[#ece5d5]/90"
                      }`}
                    >
                      <div className="whitespace-pre-line text-[11px] sm:text-xs">
                        {msg.text}
                      </div>

                      {/* Action Links / Buttons */}
                      {msg.links && msg.links.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
                          {msg.links.map((link, idx) => {
                            if (link.isStationJump) {
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    const targetId = link.url.replace("#", "");
                                    jumpToStation(targetId, link.label);
                                  }}
                                  className="inline-flex items-center gap-1 border border-[#ffd23a]/60 bg-[#ffd23a]/15 px-2 py-1 text-[10px] font-bold text-[#ffd23a] hover:bg-[#ffd23a] hover:text-[#16181c] transition cursor-pointer"
                                >
                                  <Navigation size={10} />
                                  <span>{link.label}</span>
                                </button>
                              );
                            }

                            return (
                              <a
                                key={idx}
                                href={link.url}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={() => sounds.playClick()}
                                className="inline-flex items-center gap-1 border border-[#9dfc3f]/50 bg-[#9dfc3f]/10 px-2 py-1 text-[10px] font-bold text-[#9dfc3f] hover:bg-[#9dfc3f] hover:text-[#16181c] transition cursor-pointer"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight size={11} />
                              </a>
                            );
                          })}
                        </div>
                      )}

                      {/* Interactive Follow-up Question Pills */}
                      {!isUser && msg.followUps && msg.followUps.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                          {msg.followUps.map((fu, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSend(fu)}
                              className="text-[9px] border border-white/10 bg-black/30 px-2 py-0.5 text-white/60 hover:border-[#ff6a1a] hover:text-white transition cursor-pointer"
                            >
                              ▸ {fu}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Copy message button */}
                      {!isUser && (
                        <button
                          onClick={() => handleCopyMessage(msg.text, msg.id)}
                          className="opacity-0 group-hover:opacity-100 transition absolute top-2 right-2 text-white/40 hover:text-white cursor-pointer"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check size={12} className="text-[#9dfc3f]" /> : <Copy size={12} />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-white/50 text-[10px] pl-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a1a] animate-ping" />
                  <span>Conductor synthesizing dispatch telemetry...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Jump to Latest Floating Pill when scrolled up */}
            {isScrolledUp && (
              <button
                onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="absolute bottom-16 right-4 flex items-center gap-1 border border-[#ff6a1a] bg-[#16181c]/95 px-2.5 py-1 text-[10px] font-mono text-[#ff6a1a] shadow-xl backdrop-blur-md cursor-pointer hover:bg-[#ff6a1a] hover:text-[#16181c] transition"
              >
                <span>NEW MESSAGES</span>
                <ChevronDown size={11} />
              </button>
            )}

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
                placeholder="Ask about papers, Choice India, goals, or cruise to station..."
                className="flex-1 border border-white/15 bg-[#0e1013] px-3 py-2 text-xs text-white placeholder-white/35 focus:border-[#ff6a1a] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 items-center justify-center border border-[#ff6a1a] bg-[#ff6a1a] text-[#16181c] disabled:opacity-40 disabled:border-white/10 disabled:bg-white/5 disabled:text-white/30 transition hover:bg-transparent hover:text-[#ff6a1a] cursor-pointer"
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
