export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  category: "Financial AI" | "Machine Learning" | "Explainable AI" | "Agentic AI" | "Data Analytics" | "Full-Stack Engineering" | "Research";
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  featured: boolean;
  accent: string;
  accentRgb: string;
  gradient?: string;
  github: string;
  demoUrl?: string;
  status: "Prototype / Technical Assessment" | "Submitted / Under Review" | "Implemented" | "Research in progress" | "Production Architecture";
  isFinancialAI?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-portfolio-analytics-agent",
    title: "AI Portfolio Analytics Agent",
    subtitle: "NL-to-SQL Engine · Sector Exposure Calculation · Read-Only Guardrails · SQLite Sandbox",
    domain: "Financial AI & Agentic Systems",
    category: "Financial AI",
    isFinancialAI: true,
    description: "An evidence-grounded financial analytics agent designed for the PL Capital technical assessment. Converts natural-language investor inquiries into validated read-only SQL queries over normalized SQLite portfolio databases, computes real-time sector exposure allocations, and enforces deterministic tool routing with ground-truth verification.",
    tags: ["Financial AI", "NL-to-SQL", "Agentic Systems", "SQLite", "Gemini API", "Streamlit", "PL Capital"],
    metrics: [
      { label: "Target Scope", value: "PL Capital Assessment" },
      { label: "Execution Sandbox", value: "SQLite (Read-Only)" },
      { label: "Safety Verification", value: "AST Token Safeguard" },
      { label: "Evaluation", value: "Ground-Truth Suite" },
    ],
    technologies: ["Python", "SQLite", "Gemini API", "Streamlit", "SQLAlchemy", "Pandas", "AST Parser", "Prompt Engineering"],
    challenges: [
      "Naive LLM query synthesis risks severe database mutations (e.g. DROP, UPDATE, DELETE) and hallucinated schema relationships.",
      "Financial queries often require deterministic mathematical aggregations (e.g. precise sector concentration % and weighted cost basis) rather than unstructured prose generation.",
      "Ambiguous investor intents (e.g., 'show risk' vs 'list holdings') require strict tool-routing boundaries before query execution."
    ],
    solutions: [
      "Engineered a deterministic Intent Router classifying prompts into direct SQL querying, sector concentration calculations, or schema clarifications.",
      "Implemented an Abstract Syntax Tree (AST) SQL safety validator strictly enforcing SELECT-only statements and blocking multi-statement or DDL/DML tokens.",
      "Constructed a ground-truth evaluation benchmark verifying syntactic validity, parameter binding, and numerical calculation parity against known portfolio holdings."
    ],
    results: [
      "Successfully built the complete architectural prototype, SQLite relational schema, intent router, and Streamlit dashboard interface ready for PL Capital technical review."
    ],
    featured: true,
    accent: "#3ad7ff",
    accentRgb: "58, 215, 255",
    github: "https://github.com/harshkhamkar26/AI-Portfolio-Analytics-Agent",
    demoUrl: "/#financial-demo",
    status: "Prototype / Technical Assessment",
  },
  {
    slug: "hyperparameter-optimization-xai",
    title: "Explainable Hyperparameter Optimization for Imbalanced Tabular Classification",
    subtitle: "Journal Paper – Under Review · Optuna Bayesian · TreeSHAP · Class Imbalance",
    domain: "Machine Learning & Explainable AI",
    category: "Explainable AI",
    description: "A peer-reviewed machine learning journal paper (submitted and under review) addressing severe tabular class imbalance on the UCI Bank Marketing benchmark. Formulates an end-to-end framework integrating Bayesian optimization via Optuna, cost-sensitive threshold adjustments, SMOTE-NC mixed categorical resampling, and TreeSHAP explainability to guarantee feature attribution stability across the hyperparameter search space.",
    tags: ["Journal Paper", "Under Review", "Explainable AI", "Optuna", "TreeSHAP", "Class Imbalance", "SMOTE-NC"],
    metrics: [
      { label: "Publication Type", value: "Journal Paper" },
      { label: "Peer-Review Status", value: "Submitted / Under Review" },
      { label: "Optimization Framework", value: "Optuna Bayesian" },
      { label: "Explainability Method", value: "TreeSHAP Stability" },
    ],
    technologies: ["Python", "Scikit-Learn", "Optuna", "TreeSHAP", "SMOTE-NC", "Pandas", "Bayesian Optimization"],
    challenges: [
      "Severe tabular class imbalance where default loss functions deceptively score high accuracy while failing entirely on minority financial risk classes.",
      "Black-box Bayesian search unpredictably distorts underlying feature importance attributions across trials, preventing deployment in auditable financial settings."
    ],
    solutions: [
      "Implemented a multi-metric objective function jointly optimizing F1-macro, Precision-Recall AUC (PR-AUC), and cost-sensitive decision thresholds.",
      "Generated trial-by-trial TreeSHAP global summary and local attribution waterfall plots to mathematically audit and verify feature importance stability."
    ],
    results: [
      "Authored complete journal manuscript submitted and under peer review, establishing verifiable feature attribution stability under severe class imbalance."
    ],
    featured: true,
    accent: "#9dfc3f",
    accentRgb: "157, 252, 63",
    github: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI",
    status: "Submitted / Under Review",
  },
  {
    slug: "data-analytics-projects",
    title: "Enterprise Data Analytics & BI Operations",
    subtitle: "Choice India · 128,000+ Records · 11 Power BI Dashboards · Zoho Analytics",
    domain: "Enterprise Analytics & Business Intelligence",
    category: "Data Analytics",
    description: "Enterprise data analytics and business intelligence workflows engineered during the Choice India internship. Focused on processing a 3-month MakeMyTrip dataset of approximately 128,000 records, authoring ~3 executive SQL/Zoho reports weekly, deploying 11 production Power BI dashboards, and supporting AiSensy WhatsApp automation.",
    tags: ["Data Analytics", "Power BI", "SQL", "Zoho Analytics", "Choice India", "MakeMyTrip", "AiSensy"],
    metrics: [
      { label: "Dataset Scale", value: "~128,000 Records" },
      { label: "Production Dashboards", value: "11 Views Deployed" },
      { label: "Reporting Cadence", value: "~3 Reports / Week" },
      { label: "Overhead Slashing", value: "40% Time Reduction" },
    ],
    technologies: ["Power BI", "DAX", "SQL", "Zoho Analytics", "Pandas", "AiSensy", "Excel VBA"],
    challenges: [
      "Cleansing and integrating disparate CRM, transactional travel records, and partner data streams with inconsistent schemas.",
      "Delivering near-instant cross-filtering on 100k+ row tables for executive leadership across GIC, GFC, and MakeMyTrip."
    ],
    solutions: [
      "Designed star-schema dimensional data models with optimized DAX measures and indexed SQL relational routines.",
      "Engineered automated refresh pipelines and integrated AiSensy WhatsApp notification webhooks across client communication workflows."
    ],
    results: [
      "Delivered 11 active production dashboards and reduced manual report compilation overhead by approximately 40%."
    ],
    featured: true,
    accent: "#ff6a1a",
    accentRgb: "255, 106, 26",
    github: "https://github.com/harshkhamkar26/-Data-Analytics-Projects",
    status: "Implemented",
  },
  {
    slug: "student-performance-xai",
    title: "SHAP-Based Explainable Student Performance Prediction",
    subtitle: "Conference Paper – Under Review · Random Forest · SVM · Logistic Regression · Zero Leakage",
    domain: "Educational Data Mining & Explainable AI",
    category: "Explainable AI",
    description: "An academic conference paper (submitted and under review) formulating an explainable predictive framework for secondary academic achievement. Conducts a rigorous comparative benchmark across Random Forest, SVM, and Logistic Regression with TreeSHAP and KernelSHAP interpretability, employing strict zero-leakage feature filtration.",
    tags: ["Conference Paper", "Under Review", "Random Forest", "SVM", "Logistic Regression", "SHAP", "Zero Leakage"],
    metrics: [
      { label: "Publication Type", value: "Conference Paper" },
      { label: "Peer-Review Status", value: "Submitted / Under Review" },
      { label: "Benchmarked Models", value: "RF, SVM, LogReg" },
      { label: "Explainability", value: "Tree & Kernel SHAP" },
    ],
    technologies: ["Python", "Scikit-Learn", "Random Forest", "Support Vector Machines", "Logistic Regression", "SHAP", "Pandas"],
    challenges: [
      "Preventing historical intermediate exam marks (G1/G2) from contaminating features while isolating actionable behavioral and socio-economic variables.",
      "Delivering statistical predictive accuracy that non-technical counselors can inspect through intuitive graphical explanations."
    ],
    solutions: [
      "Enforced a strict zero-leakage boundary isolating clean behavioral indicators (study time, parental education, absences).",
      "Benchmarked multiple model paradigms and constructed SHAP waterfall summaries revealing high-leverage intervention targets."
    ],
    results: [
      "Authored conference paper under peer review; provided educators with early-warning intervention blueprints."
    ],
    featured: true,
    accent: "#3ad7ff",
    accentRgb: "58, 215, 255",
    github: "https://github.com/harshkhamkar26/Student_Performance_XAI",
    status: "Submitted / Under Review",
  },
  {
    slug: "sentinel-x",
    title: "SENTINEL-X — Agentic SOC & Threat Investigation",
    subtitle: "Autonomous Incident Response · Evidence Correlation · Audit-Log Guardrails",
    domain: "Agentic AI & Cybersecurity",
    category: "Agentic AI",
    description: "An agentic security operations platform concept designed for continuous telemetry ingestion, multi-stage alert correlation, evidence-grounded threat investigation, and human-in-the-loop automated response playbooks.",
    tags: ["Agentic AI", "Cybersecurity", "SIEM / SOAR", "Threat Intel", "FastAPI"],
    metrics: [
      { label: "Architecture", value: "Multi-Agent SOC" },
      { label: "Investigation Mode", value: "Approval-Gated" },
      { label: "Verification", value: "Audit-Log Reversible" },
      { label: "Framework", value: "Python & FastAPI" },
    ],
    technologies: ["Python", "FastAPI", "Agentic Systems", "Threat Intel APIs", "Graph Correlation", "Docker"],
    challenges: [
      "Severe analyst alert fatigue caused by thousands of un-correlated SIEM notifications daily.",
      "Unbounded autonomous action risks causing inadvertent network disruption."
    ],
    solutions: [
      "Structured agentic reasoning loops with strict read-only investigation phases.",
      "Enforced deterministic whitelist policies with cryptographic audit logging before remediation execution."
    ],
    results: [
      "Formulated complete Phase-0 architecture, threat model, UML diagrams, and integration test protocols."
    ],
    featured: true,
    accent: "#ffd23a",
    accentRgb: "255, 210, 58",
    github: "https://github.com/harshkhamkar26/SENTINEL-X",
    status: "Production Architecture",
  },
  {
    slug: "multimodal-deepfake-detection",
    title: "Multimodal Audio-Visual Deepfake Detection",
    subtitle: "Cross-Manipulation Generalization · Reliability Temporal Attention Fusion",
    domain: "Deep Learning & Vision",
    category: "Machine Learning",
    description: "Deep learning research architecture engineered to detect modern synthetic manipulations across both visual facial artifacts and acoustic voice anomalies, employing reliability-aware cross-attention temporal fusion.",
    tags: ["Deep Learning", "Computer Vision", "Audio Processing", "PyTorch", "Transformers"],
    metrics: [
      { label: "Modality Stream", value: "Audio + Video" },
      { label: "Fusion Technique", value: "Reliability Attention" },
      { label: "Generalization", value: "Cross-Manipulation" },
      { label: "Framework", value: "PyTorch & Librosa" },
    ],
    technologies: ["PyTorch", "TorchAudio", "OpenCV", "Temporal CNNs", "Librosa", "Transformers"],
    challenges: [
      "Deepfakes trained with modern diffusion models easily fool single-modality detectors.",
      "Temporal desynchronization between speech phonemes and lip visemes under heavy network compression."
    ],
    solutions: [
      "Engineered dual-stream feature extractors for mel-spectrogram harmonics and frame-level spatial cues.",
      "Designed an attention-gated fusion module that weights modality confidence during heavy compression or noise."
    ],
    results: [
      "Experimental framework providing strong generalization across unseen manipulation techniques."
    ],
    featured: true,
    accent: "#ff2e97",
    accentRgb: "255, 46, 151",
    github: "https://github.com/harshkhamkar26/multimodal-deepfake-detection",
    status: "Research in progress",
  },
  {
    slug: "uai-sports-club-platform",
    title: "UAI Sports Club Management Platform",
    subtitle: "Next.js 16 · Dynamic Brackets · Leaderboards · Real-time Tournament Ops",
    domain: "Full-Stack Systems & Leadership",
    category: "Full-Stack Engineering",
    description: "Production full-stack web platform built for Universal AI University Sports Club, managing multi-tier athletic leagues, live match scoring, player profiles, dynamic tournament brackets, and campus athletic leaderboards for 1,200+ students.",
    tags: ["Full-Stack", "Next.js", "TypeScript", "Tailwind CSS", "Tournament Engine"],
    metrics: [
      { label: "Active Student Reach", value: "1,200+ Students" },
      { label: "Bracket Engine", value: "Live Dynamic Brackets" },
      { label: "Frontend Stack", value: "Next.js 16 & React 19" },
      { label: "Styling Engine", value: "Tailwind CSS v4" },
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "REST APIs"],
    challenges: [
      "Handling concurrent score submissions and bracket reorganizations during high-intensity campus tournaments.",
      "Designing a high-contrast mobile-first UI for students and referees on the court."
    ],
    solutions: [
      "Engineered optimistic UI state updates and reactive tournament bracket trees.",
      "Integrated fast player profile search and dynamic standing calculations."
    ],
    results: [
      "Successfully deployed for university tournaments including Undergrad Premier League and intercollegiate festivals."
    ],
    featured: false,
    accent: "#ff6a1a",
    accentRgb: "255, 106, 26",
    github: "https://github.com/harshkhamkar26/uai-sports-club-platform",
    status: "Implemented",
  },
  {
    slug: "bistro-cafe-management-system",
    title: "Bistro Cafe Management & POS System",
    subtitle: "Java & Python · Relational Database Engine · POS Workflows",
    domain: "Software Systems",
    category: "Full-Stack Engineering",
    description: "Full-stack cafe management system engineered for the campus dining facility at Universal AI University, facilitating real-time inventory management, queue dispatch, order billing, and analytical sales tracking.",
    tags: ["Software Engineering", "Java", "Python", "MySQL", "POS"],
    metrics: [
      { label: "Order Throughput", value: "Real-time POS" },
      { label: "Backend Core", value: "Java & Python" },
      { label: "Database", value: "Normalized MySQL" },
      { label: "Architecture", value: "ACID Transactions" },
    ],
    technologies: ["Java", "Python", "MySQL", "HTML5", "CSS3", "JavaScript"],
    challenges: [
      "Synchronizing inventory depletion with active orders to prevent stock disparities during rush periods."
    ],
    solutions: [
      "Designed atomic database transactions and an ergonomic cashier terminal interface."
    ],
    results: [
      "Significantly cut checkout queue times and gave managers instant day-end revenue summaries."
    ],
    featured: false,
    accent: "#ff6a1a",
    accentRgb: "255, 106, 26",
    github: "https://github.com/harshkhamkar26/bistro-cafe-management-system",
    status: "Implemented",
  },
  {
    slug: "sports-analytics-research",
    title: "Sports Analytics & Predictive Game Modeling",
    subtitle: "Player Tracking · Biometric Intelligence · Tactical Optimization",
    domain: "Analytics & ML",
    category: "Research",
    description: "Applied research repository combining data science with competitive sports insights. Analyzes player efficiency ratings (PER), spatial shot-charts, and predictive game outcomes in competitive basketball and football.",
    tags: ["Sports Analytics", "Python", "Machine Learning", "Data Visualization"],
    metrics: [
      { label: "Sports Focus", value: "Basketball & Football" },
      { label: "Metrics", value: "PER, Shot Charts, Win Shares" },
      { label: "Analytics Stack", value: "Pandas & Seaborn" },
      { label: "Application", value: "Tactical Playbooks" },
    ],
    technologies: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
    challenges: [
      "Capturing non-box-score defensive impact and possession momentum in predictive game algorithms."
    ],
    solutions: [
      "Modeled spatial shooting heatmaps and pace-adjusted efficiency coefficients."
    ],
    results: [
      "Provided data-backed strategic play recommendations for university tournament teams."
    ],
    featured: false,
    accent: "#3ad7ff",
    accentRgb: "58, 215, 255",
    github: "https://github.com/harshkhamkar26/Sports-Analytics-Research",
    status: "Research in progress",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
