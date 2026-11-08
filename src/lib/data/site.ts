export const siteConfig = {
  name: "Harsh Khamkar",
  title: "AI/ML Engineer · Data Science Researcher · Enterprise Analytics",
  tagline: "Building explainable machine-learning systems, evidence-grounded AI agents and data-driven analytical solutions for complex financial and business problems.",
  location: "Mumbai, Maharashtra, India",
  coords: "18.98° N, 72.82° E",
  email: "harshkhamkar26@gmail.com",
  phone: "+91 9326508918",
  linkedin: "https://www.linkedin.com/in/harsh-khamkar-b4a54a32a/",
  github: "https://github.com/harshkhamkar26",
  resumeUrl: "/resume.pdf",
  photoUrl: "/images/harsh-khamkar.jpg",
  institution: "Universal AI University, Mumbai",
  degree: "B.Tech in Artificial Intelligence, Machine Learning & Data Science (Universal AI University · Expected 2028 · CGPA: 8.17)",
  keywords: [
    "Harsh Khamkar",
    "AI/ML Engineer",
    "Data Science Researcher",
    "Explainable AI",
    "SHAP",
    "TreeSHAP",
    "KernelSHAP",
    "Optuna Bayesian Optimization",
    "Imbalanced Tabular Classification",
    "Enterprise Analytics",
    "Choice India",
    "128,000 Records",
    "Power BI",
    "Zoho Analytics",
    "Universal AI University",
    "Mumbai",
    "Python",
    "Scikit-Learn",
    "Next.js"
  ],
};

export const stationStops = [
  { id: "hero", no: "01", name: "ORIGIN", label: "Hero Terminal" },
  { id: "tracks", no: "02", name: "TRACKS", label: "4 Core Disciplines" },
  { id: "showcase", no: "03", name: "FLAGSHIP", label: "Flagship 3D Orbit" },
  { id: "depot", no: "04", name: "DEPOT", label: "Research & Code Fleet" },
  { id: "about", no: "05", name: "PROFILE", label: "Engineer Profile" },
  { id: "expedition", no: "06", name: "JOURNEY", label: "Experience & Timeline" },
  { id: "matrix", no: "07", name: "MATRIX", label: "Skills & Accreditations" },
  { id: "terminal", no: "08", name: "COMMS", label: "Dispatch Terminal" },
];

export const labItems = [
  { icon: "database" as const, value: 128000, label: "Records Processed (Choice India)" },
  { icon: "chart" as const, value: 11, label: "Power BI Dashboards Deployed" },
  { icon: "flask" as const, value: 2, label: "Research Papers Under Review" },
  { icon: "brain" as const, value: 7, label: "Core Competency Domains" },
];

export type TechnicalTrack = {
  id: string;
  no: string;
  name: string;
  long: string;
  accent: string;
  ink: string;
  line: string;
  skills: string[];
  applications: string[];
  relatedProjects: { name: string; slug: string }[];
  evidence: string;
};

export const tracks: TechnicalTrack[] = [
  {
    id: "aiml-xai",
    no: "01",
    name: "AIML & XAI",
    long: "Machine Learning & Explainable AI",
    accent: "#9dfc3f",
    ink: "#0f1a07",
    line: "Developing transparent ML models through rigorous statistical benchmarking, Bayesian hyperparameter optimization with Optuna, and TreeSHAP/KernelSHAP attribution auditing.",
    skills: ["TreeSHAP & KernelSHAP", "Optuna Bayesian Tuning", "SMOTE-NC Resampling", "Scikit-Learn", "Cost-Sensitive Thresholds", "Class Imbalance"],
    applications: ["Transparent Credit & Risk Scoring", "Hyperparameter Space Sensitivity Auditing", "Zero-Leakage Student Performance Blueprints"],
    relatedProjects: [
      { name: "Explainable Hyperparameter Optimization (Journal)", slug: "hyperparameter-optimization-xai" },
      { name: "Student Performance Prediction (Conference)", slug: "student-performance-xai" }
    ],
    evidence: "2 peer-reviewed research papers submitted & under review; verified feature attribution stability under severe class imbalance."
  },
  {
    id: "data-bi",
    no: "02",
    name: "DATA & BI",
    long: "Data Engineering & Business Intelligence",
    accent: "#ff6a1a",
    ink: "#1d0c02",
    line: "Translating 128,000+ enterprise financial and operational records into executive decision clarity through star-schema dimensional modeling, SQL ETL pipelines, and automated Power BI reporting.",
    skills: ["Power BI (DAX)", "Zoho Analytics", "SQL Pipeline Optimization", "Star Schema Dimensional Modeling", "Pandas & NumPy", "AiSensy Automation"],
    applications: ["Executive KPI Cockpits", "Financial Reconciliation Dashboards", "Operational SLA Monitoring", "Automated WhatsApp Reporting"],
    relatedProjects: [
      { name: "Enterprise BI & Data Operations", slug: "data-analytics-projects" }
    ],
    evidence: "Preprocessed ~128K MakeMyTrip records; engineered 11 production Power BI dashboards at Choice India; ~3 reports delivered weekly."
  },
  {
    id: "genai-agentic",
    no: "03",
    name: "GENAI & AGENTS",
    long: "Generative AI & Autonomous Agents",
    accent: "#3ad7ff",
    ink: "#04141c",
    line: "Architecting autonomous agentic investigation loops, multi-modal audio-visual neural models, and secure tool routing pipelines with verifiable audit trails.",
    skills: ["Agentic Tool Routing", "Function Calling", "Multi-Modal Audio-Visual Fusion", "Prompt Engineering", "Structured Output Parsing", "PyTorch Deep Learning"],
    applications: ["Agentic SOC Alert Correlation", "Cross-Manipulation Deepfake Defense", "Deterministic Tool Routing"],
    relatedProjects: [
      { name: "SENTINEL-X Agentic SOC", slug: "sentinel-x" },
      { name: "Multimodal Deepfake Detection", slug: "multimodal-deepfake-detection" }
    ],
    evidence: "Engineered multi-modal facial/acoustic deepfake detection model and agentic security triage loop with tamper-evident logs."
  },
  {
    id: "systems-fullstack",
    no: "04",
    name: "SYSTEMS & FULLSTACK",
    long: "Software Systems & Full-Stack Engineering",
    accent: "#ffd23a",
    ink: "#1c1502",
    line: "Building high-performance web applications, dynamic bracket tournament engines, and ACID-compliant transaction databases for real-world campus and business operations.",
    skills: ["Next.js & React 19", "TypeScript", "Tailwind CSS", "Relational MySQL", "Java & Python POS Engines", "RESTful Architecture"],
    applications: ["Campus Sports Tournament Management", "Cashier Queue & Inventory POS", "Optimistic Real-Time UI Updates"],
    relatedProjects: [
      { name: "UAI Sports Club Platform", slug: "uai-sports-club-platform" },
      { name: "Bistro Cafe Management & POS", slug: "bistro-cafe-management-system" }
    ],
    evidence: "Deployed campus athletic platform powering tournaments for 1,200+ students and atomic transaction POS system cutting checkout queues."
  }
];

export type Publication = {
  id: string;
  title: string;
  type: "Journal Paper" | "Conference Paper";
  status: "Submitted / Under Review";
  venue: string;
  badge: string;
  accent: string;
  accentRgb: string;
  domain: string;
  authors: string;
  abstractSummary: string;
  problemStatement: string;
  dataset: string;
  methodology: string[];
  models: string[];
  results: string;
  contribution: string;
  limitations: string;
  tags: string[];
  github: string;
  slug: string;
  metrics: { label: string; value: string }[];
};

export const publications: Publication[] = [
  {
    id: "journal-tabular-hpo",
    title: "Explainable Hyperparameter Optimization for Imbalanced Tabular Classification",
    type: "Journal Paper",
    status: "Submitted / Under Review",
    venue: "Peer-Reviewed Scientific Journal (Submitted / Under Review)",
    badge: "Journal Paper · Under Review",
    accent: "#9dfc3f",
    accentRgb: "157, 252, 63",
    domain: "Machine Learning & Explainable AI",
    authors: "Harsh Khamkar et al.",
    abstractSummary: "An academic research investigation formulating an end-to-end framework addressing severe tabular class imbalance. Unifies Bayesian hyperparameter search via Optuna, SMOTE-NC mixed categorical/continuous resampling, cost-sensitive threshold adjustments, and TreeSHAP explainability to mathematically guarantee feature importance attribution stability across hyperparameter trials.",
    problemStatement: "Tabular class imbalance causes standard classification algorithms to deceptively achieve high overall accuracy while failing completely on minority critical classes. Concurrently, black-box Bayesian optimization unpredictably distorts underlying feature importance attributions across trials, preventing model deployment in regulated high-stakes domains.",
    dataset: "UCI Bank Marketing Benchmark (41,188 instances, 20 features) exhibiting severe positive-class skew.",
    methodology: [
      "Optuna Bayesian optimization balancing F1-macro and Precision-Recall Area Under Curve (PR-AUC).",
      "SMOTE-NC synthetic minority oversampling adapted for mixed continuous and categorical feature spaces.",
      "Cost-sensitive threshold adjustments tuned to minimize false-negative enterprise risk.",
      "Trial-by-trial TreeSHAP global summary and local attribution auditing to evaluate attribution drift."
    ],
    models: ["LightGBM", "XGBoost", "Random Forest", "Optuna Bayesian Engine"],
    results: "Verified mathematically stable feature attributions across top-performing hyperparameter configurations while achieving statistically superior F1-macro and PR-AUC over default baselines.",
    contribution: "First end-to-end open framework coupling Bayesian hyperparameter search with explicit SHAP attribution stability guarantees for imbalanced tabular classification.",
    limitations: "Evaluated primarily on tabular banking domain benchmarks; computational overhead scales with large-scale TreeSHAP evaluation across thousands of optimization trials.",
    tags: ["Journal Paper", "Under Review", "Explainable AI", "Optuna", "TreeSHAP", "SMOTE-NC", "Tabular Data"],
    github: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI",
    slug: "hyperparameter-optimization-xai",
    metrics: [
      { label: "Publication Type", value: "Journal Paper" },
      { label: "Peer-Review Status", value: "Submitted / Under Review" },
      { label: "Optimization", value: "Optuna Bayesian" },
      { label: "Explainability", value: "TreeSHAP Stability" }
    ]
  },
  {
    id: "conf-student-perf",
    title: "SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression",
    type: "Conference Paper",
    status: "Submitted / Under Review",
    venue: "International Academic Conference (Submitted / Under Review)",
    badge: "Conference Paper · Under Review",
    accent: "#3ad7ff",
    accentRgb: "58, 215, 255",
    domain: "Educational Data Mining & XAI",
    authors: "Harsh Khamkar et al.",
    abstractSummary: "A comparative machine learning benchmark predicting secondary student academic outcomes across mathematics and Portuguese language cohorts. Formulates a strict zero-leakage pipeline filtering downstream test marks to isolate true behavioral predictors (study habits, parental education, absences) using Random Forest, SVM, and Logistic Regression with TreeSHAP & KernelSHAP interpretability.",
    problemStatement: "Existing academic prediction frameworks frequently contaminate feature matrices with intermediate exam grades (G1/G2), resulting in artificial predictive inflation without offering actionable early-intervention insights for educators.",
    dataset: "Combined Mathematics (395 records) and Portuguese Language (649 records) secondary school cohorts.",
    methodology: [
      "Strict zero-leakage feature filtration strictly eliminating intermediate grade markers.",
      "Multi-model comparative benchmark across Random Forest, Support Vector Machines (SVM), and Logistic Regression.",
      "K-fold cross-validation and hyperparameter calibration.",
      "TreeSHAP and KernelSHAP attribution matrices providing actionable intervention blueprints."
    ],
    models: ["Random Forest", "Support Vector Machines (Linear/RBF)", "Regularized Logistic Regression"],
    results: "Isolated study time, past failures, and parental education as dominant early predictors; established that non-linear Random Forest with SHAP interpretability delivers highest actionable fidelity without leakage.",
    contribution: "Formulated a transparent, leak-free early-warning framework that non-technical counselors can interpret directly via SHAP waterfall graphs.",
    limitations: "Dataset constrained to secondary public education cohorts in a single geographic region; longitudinal tracking across university cohorts remains future work.",
    tags: ["Conference Paper", "Under Review", "Random Forest", "SVM", "Logistic Regression", "SHAP", "Zero Leakage"],
    github: "https://github.com/harshkhamkar26/Student_Performance_XAI",
    slug: "student-performance-xai",
    metrics: [
      { label: "Publication Type", value: "Conference Paper" },
      { label: "Peer-Review Status", value: "Submitted / Under Review" },
      { label: "Evaluated Models", value: "RF, SVM, LogReg" },
      { label: "Explainability", value: "Tree & Kernel SHAP" }
    ]
  }
];

export const metrics = [
  { label: "Research Papers", value: "2", suffix: " Under Review" },
  { label: "Enterprise Records", value: "128K+", suffix: " Cleansed" },
  { label: "Production BI Dashboards", value: "11", suffix: " Deployed" },
  { label: "Academic Standing", value: "8.17", suffix: " CGPA" },
];

export const experiences = [
  {
    company: "Choice India (The Joy of Earning)",
    role: "Data Analyst & Business Analyst Intern",
    period: "18 May 2026 – 18 July 2026",
    location: "Mumbai, India",
    badge: "Industry Internship",
    color: "#ff6a1a",
    highlights: [
      "Processed and cleansed a 3-month operational MakeMyTrip dataset containing approximately 128,000 records using SQL and Python to ensure clean schemas for downstream analytics.",
      "Analyzed financial and business datasets across key client accounts (GIC, GFC, and MakeMyTrip) using SQL queries and Zoho Analytics, delivering approximately 3 executive reports per week.",
      "Designed, maintained, and deployed 11 interactive Power BI dashboards to track revenue, customer conversion, and operational business KPIs.",
      "Assisted in configuring automated WhatsApp messaging and customer interaction workflows via AiSensy across B2B, B2C, and B2G pipelines.",
      "Optimized recurring SQL query routines, slashing manual data compilation and reporting overhead by approximately 40%."
    ]
  },
  {
    company: "One Globe Build Con LLP",
    role: "Technology & Innovation Intern",
    period: "April 2025 – July 2025",
    location: "Nagpur, India",
    badge: "Industry Internship",
    color: "#9dfc3f",
    highlights: [
      "Engineered machine learning workflows involving structured data preprocessing, feature engineering, and model evaluation using Python and Scikit-learn.",
      "Constructed analytical business dashboards and telemetry visualisations using Pandas, Matplotlib, Excel, and Power BI.",
      "Developed responsive frontend interfaces and data presentation components using React.js, JavaScript, and Tailwind CSS."
    ]
  },
  {
    company: "Universal AI University & SMART Project",
    role: "Head of Operations & Field Researcher",
    period: "January 2025 – Present",
    location: "Karjat / Mumbai, India",
    badge: "Institutional Leadership",
    color: "#3ad7ff",
    highlights: [
      "Directed ground operations and demographic data collection for rural educational technology integration initiatives across 15+ village communities.",
      "Synthesized technical gap-analysis reports and logistical frameworks for administrative faculty stakeholders.",
      "Led and coordinated student volunteer teams of 30+ members across field data validation and resource distribution."
    ]
  }
];

export const journeyTimeline = [
  {
    year: "2025–2026",
    title: "Academic Research & Peer-Reviewed Submissions",
    institution: "Scientific Journals & Academic Conferences",
    details: "Authored 1 Journal Paper ('Explainable Hyperparameter Optimization for Imbalanced Tabular Classification') and 1 Conference Paper ('SHAP-Based Explainable Student Performance Prediction Using Random Forest, SVM, and Logistic Regression'). Both submitted and currently under peer review."
  },
  {
    year: "18 May–18 Jul 2026",
    title: "Data Analyst & Business Analyst Intern",
    institution: "Choice India (The Joy of Earning)",
    details: "Cleansed ~128K MakeMyTrip records; engineered 11 Power BI dashboards; authored ~3 reports/week using SQL & Zoho Analytics; supported AiSensy workflow automation."
  },
  {
    year: "Apr–Jul 2025",
    title: "Technology & Innovation Intern",
    institution: "One Globe Build Con LLP",
    details: "Engineered Scikit-learn ML workflows, analytical Power BI views, and React modular frontends."
  },
  {
    year: "2024–2028",
    title: "B.Tech in Artificial Intelligence, Machine Learning & Data Science",
    institution: "Universal AI University, Mumbai",
    details: "Current CGPA: 8.17. Core curriculum in Statistical Learning, Big Data Systems, Explainable AI, and Quantitative Reasoning."
  }
];

export const certifications = [
  {
    name: "Artificial Intelligence: Technologies, Applications & Trends",
    issuer: "Columbia University (edX)",
    year: "2025",
    accent: "#3ad7ff",
    tag: "AI & ML",
    description: "Rigorous coursework in core AI principles, supervised/unsupervised machine learning paradigms, search algorithms, and intelligent agent designs."
  },
  {
    name: "Power BI & Business Intelligence Certification",
    issuer: "DataCamp",
    year: "2025",
    accent: "#ff6a1a",
    tag: "BI & Analytics",
    description: "Star-schema dimensional modeling, complex DAX expressions, data transformations, and automated enterprise reporting pipelines."
  },
  {
    name: "Machine Learning with Python & Scikit-Learn",
    issuer: "DataCamp",
    year: "2024",
    accent: "#9dfc3f",
    tag: "Data Science",
    description: "Statistical modeling, cross-validation, regularization, hyperparameter tuning, and ensemble methods with Scikit-learn."
  },
  {
    name: "SQL & Relational Database Engineering",
    issuer: "DataCamp / HCLTech",
    year: "2024",
    accent: "#ffd23a",
    tag: "Database",
    description: "Relational query optimization, window functions, complex joins, subqueries, and ACID-compliant transaction design."
  }
];

export const leadership = [
  {
    title: "President — UAI Sports Club",
    org: "Universal AI University (2025–2026)",
    badge: "Executive Leadership",
    description: "Managing campus-wide athletic tournaments, committee budgets, venue logistics, and team operations for 1,000+ participating students."
  },
  {
    title: "National & State Level Basketball Athlete",
    org: "Competitive Varsity Athletics",
    badge: "Athletic Accolade",
    description: "1st Prize Winner in Inter-College Basketball Championship. Applying high-pressure tactical composure, decisive execution, and athletic resilience to engineering sprints."
  },
  {
    title: "Event Head — Rush4Rush Intercollegiate Fest",
    org: "Universal AI University",
    badge: "Operations Head",
    description: "Directed technical stage logistics, intercollegiate sponsorships, and scheduling operations for major multi-university festival attendees."
  }
];

export const verifiableEvidence = [
  {
    domain: "Financial & Enterprise Analytics",
    metric: "128,000+ Records",
    detail: "Cleansed and analyzed operational MakeMyTrip & Choice India datasets with SQL & Zoho Analytics."
  },
  {
    domain: "Business Intelligence",
    metric: "11 Dashboards",
    detail: "Constructed 11 production Power BI views for executive KPI monitoring delivering ~3 reports/week."
  },
  {
    domain: "Explainable AI Research",
    metric: "2 Papers Submitted",
    detail: "Authored 1 Journal & 1 Conference paper under review on Optuna Bayesian optimization & TreeSHAP."
  },
  {
    domain: "Full-Stack & Systems Engineering",
    metric: "1,200+ Active Reach",
    detail: "Architected UAI Sports Club tournament engine and Bistro Cafe POS relational transaction database."
  },
  {
    domain: "Academic Rigor",
    metric: "8.17 CGPA",
    detail: "B.Tech in Artificial Intelligence, Machine Learning & Data Science at Universal AI University."
  },
  {
    domain: "Executive Leadership",
    metric: "Sports Club President",
    detail: "Led 30+ member committees, organized major sports tournaments, and competed as a National basketball athlete."
  }
];

export const atsKeywords = [
  { keyword: "Financial Data Analytics & SQL", evidence: "Processed 128K+ records at Choice India" },
  { keyword: "Explainable AI (TreeSHAP & KernelSHAP)", evidence: "2 Research Papers Under Review" },
  { keyword: "Bayesian Optimization (Optuna)", evidence: "Journal Paper Benchmark Implementation" },
  { keyword: "Power BI & DAX Dimensional Modeling", evidence: "11 Production Dashboards at Choice India" },
  { keyword: "Agentic AI & Autonomous Systems", evidence: "SENTINEL-X Autonomous Cybersecurity Investigation Loop" },
  { keyword: "Python (NumPy, Pandas, Scikit-learn)", evidence: "Core Engineering Stack across Internships" },
  { keyword: "Class Imbalance & SMOTE-NC", evidence: "Bank Marketing Benchmark Formulation" },
  { keyword: "Zoho Analytics & Automated Workflows", evidence: "Weekly C-Suite Reports & AiSensy Integrations" },
];
