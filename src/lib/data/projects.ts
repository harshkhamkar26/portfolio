export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  featured: boolean;
  gradient: string;
  github?: string;
  status?: "Implemented" | "Research in progress" | "Documentation / planning";
};

export const projects: Project[] = [
  {
    slug: "hyperparameter-optimization-xai",
    title: "Explainable Hyperparameter Optimization for Imbalanced Classification",
    subtitle: "Bank Marketing · model selection · threshold analysis · SHAP",
    description: "Research framework using the UCI Bank Marketing dataset to study class imbalance, Optuna-based hyperparameter optimization, multi-objective evaluation, threshold selection, robustness, and SHAP explanation stability.",
    tags: ["Machine Learning", "Explainable AI", "Analytics"],
    metrics: [],
    technologies: ["Python", "Pandas", "Scikit-learn", "Optuna", "SHAP", "SMOTENC"],
    challenges: ["The positive subscription class is a minority class, so accuracy alone is not an adequate evaluation measure.", "Threshold selection and explanation stability need to be assessed alongside predictive performance."],
    solutions: ["Compared class weighting and SMOTENC, with resampling restricted to training data.", "Included F1, precision, recall, PR-AUC, ROC-AUC, threshold analysis, robustness checks, and SHAP."],
    results: ["The repository documents the experimental workflow and research questions; numerical findings should be taken from final notebook outputs."],
    featured: true,
    gradient: "from-cyan-600/30 via-indigo-500/20 to-violet-500/30",
    github: "https://github.com/harshkhamkar26/Hyperparameter-Optimization-XAI",
    status: "Implemented",
  },
  {
    slug: "student-performance-xai",
    title: "Student Performance Prediction & Explainability",
    subtitle: "UCI student datasets · Random Forest regression · SHAP",
    description: "Combines the UCI Mathematics and Portuguese student datasets, creates an average final-grade target, excludes grade fields that would leak target information, and uses SHAP to explain model predictions.",
    tags: ["Machine Learning", "Explainable AI"],
    metrics: [],
    technologies: ["Python", "Pandas", "Scikit-learn", "SHAP", "Jupyter"],
    challenges: ["Combining subject-specific datasets while keeping a clear target definition.", "Avoiding target leakage and making model behaviour interpretable."],
    solutions: ["Merged records on shared student attributes and engineered an average final-grade target.", "Excluded intermediate and final grade columns from model features and documented SHAP explanations."],
    results: ["The repository documents preprocessing and explainability. Do not display an accuracy percentage for this regression task without a validated classification evaluation."],
    featured: true,
    gradient: "from-violet-600/30 via-blue-500/20 to-cyan-500/30",
    github: "https://github.com/harshkhamkar26/Student_Performance_XAI",
    status: "Implemented",
  },
  {
    slug: "multimodal-deepfake-detection",
    title: "Multimodal Deepfake Detection",
    subtitle: "Audio-visual evidence · reliability-aware temporal fusion",
    description: "Research project investigating audio and visual baselines, temporal fusion, modality reliability, disagreement analysis, robustness, and cross-manipulation generalisation. Proposed architecture and hypotheses require controlled experimental validation.",
    tags: ["Machine Learning", "Deep Learning", "Research"],
    metrics: [],
    technologies: ["Python", "Deep Learning", "Audio-Visual ML", "Experiment Design"],
    challenges: ["Ensuring leakage-resistant splits and reliable audio-video alignment.", "Separating proposed research hypotheses from experimentally demonstrated results."],
    solutions: ["Documents an experimental ladder from unimodal baselines to fusion, ablation, and robustness evaluation.", "Plans chunked, resumable preprocessing and reproducibility metadata."],
    results: ["Research in progress; the repository explicitly treats the proposed fusion improvements as hypotheses to be tested."],
    featured: true,
    gradient: "from-fuchsia-600/30 via-purple-500/20 to-cyan-500/30",
    github: "https://github.com/harshkhamkar26/multimodal-deepfake-detection",
    status: "Research in progress",
  },
  {
    slug: "sentinel-x",
    title: "SENTINEL-X — Agentic SOC Research",
    subtitle: "Evidence-grounded investigation · controlled response · auditability",
    description: "Cybersecurity platform concept documenting event ingestion, detection and correlation, agentic investigation, explainable findings, approval-gated response, and auditable workflows.",
    tags: ["AI", "Cybersecurity", "Research"],
    metrics: [],
    technologies: ["Agentic AI", "Security Analytics", "Explainable ML", "SOAR Concepts"],
    challenges: ["Maintaining evidence-grounded findings and safe boundaries for automated response.", "Separating architecture and planning from a validated, implemented system."],
    solutions: ["Documents architecture, requirements, threat model, dataset planning, UML, and verification strategy.", "Defines allow-listed, reversible, auditable response actions as a safety boundary."],
    results: ["The README identifies the project as Phase 0: requirements, architecture, UML, and dataset planning."],
    featured: true,
    gradient: "from-emerald-600/30 via-teal-500/20 to-cyan-500/30",
    github: "https://github.com/harshkhamkar26/SENTINEL-X",
    status: "Documentation / planning",
  },
  {
    slug: "sports-analytics-research",
    title: "Sports Analytics Research",
    subtitle: "A growing research and analysis repository",
    description: "A public repository for sports analytics research. Specific methods, datasets, and results should be added to this case study only after reviewing the repository contents.",
    tags: ["Analytics", "Research"],
    metrics: [],
    technologies: ["Data Analysis"],
    challenges: [],
    solutions: [],
    results: ["Explore the repository for current contents and implementation status."],
    featured: false,
    gradient: "from-amber-600/30 via-orange-500/20 to-pink-500/30",
    github: "https://github.com/harshkhamkar26/Sports-Analytics-Research",
    status: "Research in progress",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
