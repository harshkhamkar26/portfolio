export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
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
  status: "Implemented" | "Research in progress" | "Production Architecture" | "Journal Paper – Under Review" | "Conference Paper – Under Review";
};

export const projects: Project[] = [
  {
    slug: "hyperparameter-optimization-xai",
    title: "Explainable Hyperparameter Optimization for Imbalanced Tabular Classification",
    subtitle: "Journal Paper – Under Review · Optuna Bayesian · TreeSHAP · Class Imbalance",
    domain: "Machine Learning & XAI · Journal Submission",
    description: "A peer-reviewed machine learning journal paper (under review) addressing severe tabular class imbalance using the UCI Bank Marketing benchmark. Formulates an end-to-end framework integrating Bayesian hyperparameter optimization via Optuna, cost-sensitive threshold adjustments, SMOTE-NC resampling, and TreeSHAP explainability to guarantee transparency, stability, and auditability in predictive risk models.",
    tags: ["Journal Paper", "Under Review", "Explainable AI", "Optuna", "TreeSHAP", "Class Imbalance", "SMOTE-NC"],
    metrics: [
      { label: "Publication Venue", value: "Journal Paper (Under Review)" },
      { label: "Optimization Framework", value: "Optuna Bayesian" },
      { label: "Explainability Method", value: "TreeSHAP" },
      { label: "Resampling Technique", value: "SMOTE-NC" },
    ],
    technologies: ["Python", "Scikit-Learn", "Optuna", "TreeSHAP", "SMOTE-NC", "Pandas", "Bayesian Optimization"],
    challenges: [
      "Severe class imbalance where standard classification metrics deceptively score high while failing entirely on minority risk classes.",
      "Black-box Bayesian search unpredictably alters feature attribution and decision boundaries across trials without explainability guarantees."
    ],
    solutions: [
      "Implemented a multi-metric objective function optimizing F1-macro, Precision-Recall AUC (PR-AUC), and cost-sensitive classification thresholds.",
      "Generated trial-by-trial TreeSHAP global summary and local attribution waterfall plots to audit feature importance stability across the hyperparameter space."
    ],
    results: [
      "Authored complete journal manuscript submitted and under peer review, establishing verifiable feature attribution stability under severe class imbalance."
    ],
    featured: true,
    accent: "#9dfc3f",
    accentRgb: "157, 252, 63",
    github: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI",
    status: "Journal Paper – Under Review",
  },
  {
    slug: "multimodal-deepfake-detection",
    title: "Multimodal Audio-Visual Deepfake Detection",
    subtitle: "Cross-Manipulation Generalization · Reliability Temporal Fusion",
    domain: "Deep Learning & Vision",
    description: "Robust deep learning architecture designed to detect state-of-the-art synthetic manipulations across both visual facial artifacts and acoustic voice anomalies, employing reliability-aware cross-attention temporal fusion.",
    tags: ["Deep Learning", "Computer Vision", "Audio Processing", "PyTorch"],
    metrics: [
      { label: "Modality Stream", value: "Audio + Video" },
      { label: "Fusion Technique", value: "Reliability Attention" },
      { label: "Generalization", value: "Cross-Manipulation" },
    ],
    technologies: ["PyTorch", "TorchAudio", "OpenCV", "Temporal CNNs", "Librosa", "Transformers"],
    challenges: [
      "Deepfakes trained with modern GANs and diffusion models often fool single-modality detectors.",
      "Temporal desynchronization between speech phonemes and lip visemes."
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
    slug: "sentinel-x",
    title: "SENTINEL-X — Agentic SOC & Threat Investigation",
    subtitle: "Autonomous Incident Response · Evidence Correlation · SOAR Guardrails",
    domain: "Agentic AI & Cybersecurity",
    description: "An agentic security operations platform concept designed for continuous event ingestion, multi-stage alert correlation, evidence-grounded threat investigation, and human-in-the-loop automated response playbooks.",
    tags: ["Agentic AI", "Cybersecurity", "SIEM / SOAR", "Threat Intel"],
    metrics: [
      { label: "Architecture", value: "Multi-Agent SOC" },
      { label: "Response Model", value: "Approval-Gated" },
      { label: "Verification", value: "Audit-Log Reversible" },
    ],
    technologies: ["Python", "FastAPI", "Agentic Systems", "Threat Intel APIs", "Graph Correlation"],
    challenges: [
      "Security alert fatigue resulting from thousands of disparate SIEM warnings daily.",
      "Unbounded autonomous action risks causing inadvertent network disruption."
    ],
    solutions: [
      "Structured agentic reasoning loops with strict read-only investigation phases.",
      "Enforced deterministic whitelist policies with cryptographic audit logging before remediation triggers."
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
    slug: "uai-sports-club-platform",
    title: "UAI Sports Club Management & Tournament Intelligence",
    subtitle: "Full-Stack Portal · Live Brackets · Real-time Leaderboards",
    domain: "Full-Stack Systems",
    description: "Production full-stack web platform built for Universal AI University Sports Club, managing multi-tier athletic leagues, live match scoring, player profiles, tournament brackets, and campus athletic leaderboards.",
    tags: ["Full-Stack", "Next.js", "TypeScript", "Tailwind CSS"],
    metrics: [
      { label: "Active Users", value: "1,200+ Students" },
      { label: "Tournament Engine", value: "Live Dynamic Brackets" },
      { label: "Stack", value: "Next.js & TypeScript" },
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "REST APIs"],
    challenges: [
      "Handling concurrent score submissions and bracket reorganizations during high-intensity campus tournaments.",
      "Designing a high-impact mobile-first UI for students and referees on the court."
    ],
    solutions: [
      "Engineered optimistic UI state updates and reactive bracket trees.",
      "Integrated fast search, player stat cards, and dynamic standings generation."
    ],
    results: [
      "Successfully deployed for university tournaments including Undergrad Premier League and sports festivals."
    ],
    featured: true,
    accent: "#ff6a1a",
    accentRgb: "255, 106, 26",
    github: "https://github.com/harshkhamkar26/uai-sports-club-platform",
    status: "Implemented",
  },
  {
    slug: "student-performance-xai",
    title: "SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression",
    subtitle: "Conference Paper – Under Review · Random Forest · SVM · Logistic Regression · SHAP Interpretability",
    domain: "Machine Learning & XAI · Conference Paper",
    description: "A peer-reviewed academic conference paper (under review) formulating an explainable predictive framework for secondary academic achievement across mathematics and language cohorts. Conducts a rigorous comparative benchmark across Random Forest, Support Vector Machines (SVM), and Logistic Regression, applying TreeSHAP and KernelSHAP to isolate high-impact behavioral predictors with strict zero-leakage boundaries.",
    tags: ["Conference Paper", "Under Review", "Random Forest", "SVM", "Logistic Regression", "SHAP", "Explainable AI"],
    metrics: [
      { label: "Publication Venue", value: "Conference Paper (Under Review)" },
      { label: "Benchmarked Models", value: "RF, SVM, Logistic Regression" },
      { label: "Explainability", value: "TreeSHAP & KernelSHAP" },
      { label: "Target Leakage", value: "Zero (Strict Feature Gate)" },
    ],
    technologies: ["Python", "Scikit-Learn", "Random Forest", "SVM", "Logistic Regression", "SHAP", "Pandas", "Matplotlib", "Seaborn"],
    challenges: [
      "Preventing historical intermediate test grade leakage while isolating genuine behavioral and socio-economic variables driving student success.",
      "Bridging statistical predictive accuracy with clear, interpretable explanations for non-technical academic counselors."
    ],
    solutions: [
      "Filtered out downstream intermediate exam marks to isolate clean behavioral predictors (study time, parental education, absences).",
      "Benchmarked Random Forest, SVM, and Logistic Regression, constructing SHAP waterfall and summary plots highlighting high-impact leverage points."
    ],
    results: [
      "Authored conference paper currently under peer review; provided actionable early intervention blueprints for educators."
    ],
    featured: true,
    accent: "#3ad7ff",
    accentRgb: "58, 215, 255",
    github: "https://github.com/harshkhamkar26/Student_Performance_XAI",
    status: "Conference Paper – Under Review",
  },
  {
    slug: "data-analytics-projects",
    title: "Enterprise Data Analytics & BI Operations",
    subtitle: "128,000+ Records · 11+ Power BI Dashboards · Zoho Analytics",
    domain: "Enterprise Analytics & BI",
    description: "Enterprise analytics suite developed during data analyst internships. Focuses on large-scale dataset ingestion, automated financial reporting, KPI scorecards, and customer acquisition pipeline analysis.",
    tags: ["Data Analytics", "Power BI", "SQL", "Zoho Analytics"],
    metrics: [
      { label: "Record Scale", value: "128,000+ Rows" },
      { label: "Dashboards", value: "11 Production Views" },
      { label: "Automation Savings", value: "40% Time Reduction" },
    ],
    technologies: ["Power BI", "DAX", "Zoho Analytics", "SQL", "Excel VBA", "Pandas"],
    challenges: [
      "Integrating disparate CRM, sales, and travel operational data streams containing inconsistent schemas.",
      "Delivering near-instant cross-filtering on 100k+ record tables for executive leadership."
    ],
    solutions: [
      "Designed star-schema dimensional data models with optimized DAX measures.",
      "Set up automated refresh routines and WhatsApp notification webhooks via AiSensy."
    ],
    results: [
      "Delivered 11 active dashboards powering weekly executive decision-making."
    ],
    featured: false,
    accent: "#9dfc3f",
    accentRgb: "157, 252, 63",
    github: "https://github.com/harshkhamkar26/-Data-Analytics-Projects",
    status: "Implemented",
  },
  {
    slug: "bistro-cafe-management-system",
    title: "Bistro Cafe Management & Campus POS",
    subtitle: "Java & Python · Relational Database Engine · POS Workflows",
    domain: "Software Systems",
    description: "Full-stack cafe management system engineered for the campus dining facility at Universal AI University, facilitating real-time inventory management, queue dispatch, order billing, and analytical sales tracking.",
    tags: ["Software Engineering", "Java", "Python", "MySQL", "Web"],
    metrics: [
      { label: "Order Throughput", value: "Real-time POS" },
      { label: "Backend", value: "Java & Python" },
      { label: "Database", value: "Normalized SQL" },
    ],
    technologies: ["Java", "Python", "MySQL", "HTML5", "CSS3", "JavaScript"],
    challenges: [
      "Synchronizing inventory depletion with active orders to prevent stock disparities during rush periods."
    ],
    solutions: [
      "Designed atomic database transactions and an ergonomic cashier terminal interface."
    ],
    results: [
      "Significantly cut wait times and gave managers instant day-end revenue summaries."
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
    description: "Applied research repository combining data science with competitive sports insights. Analyzes player efficiency ratings, spatial shot-charts, and predictive outcomes in basketball and football.",
    tags: ["Sports Analytics", "Python", "Machine Learning", "Data Visualization"],
    metrics: [
      { label: "Sports Focus", value: "Basketball & Football" },
      { label: "Metrics", value: "PER, Shot Charts, Win Shares" },
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
