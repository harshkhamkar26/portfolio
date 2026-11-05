export type CategorizedSkillGroup = {
  category: string;
  code: string;
  accent: string;
  description: string;
  skills: { name: string; verification: string }[];
};

export type Skill = {
  name: string;
  verification?: string;
  level?: number;
};

export type SkillCategory = {
  id: string;
  name: string;
  color: string;
  description: string;
  skills: Skill[];
};

export const verifiedSkillsData: CategorizedSkillGroup[] = [
  {
    category: "PROGRAMMING",
    code: "01 // CORE",
    accent: "#ff6a1a",
    description: "Foundational programming and algorithmic languages applied across production scripts and research pipelines.",
    skills: [
      { name: "Python", verification: "Primary language for research pipelines, ML models, and data manipulation." },
      { name: "SQL", verification: "Complex relational queries, analytical joins, and window functions on 128K+ row datasets." },
      { name: "C++ (Basic)", verification: "Algorithmic data structures and foundational systems programming." },
    ],
  },
  {
    category: "DATA SCIENCE",
    code: "02 // DATA",
    accent: "#3ad7ff",
    description: "Numerical computation, high-performance dataframe wrangling, and exploratory statistical visualizations.",
    skills: [
      { name: "Pandas", verification: "Dataframe transformation, schema normalization, and exploratory data analysis." },
      { name: "NumPy", verification: "Vectorized array calculations and mathematical matrix operations." },
      { name: "Scikit-learn", verification: "Pipeline construction, preprocessing scalers, and supervised learning benchmarks." },
      { name: "Matplotlib", verification: "Scientific publication figures and multi-panel diagnostic plotting." },
      { name: "Seaborn", verification: "Statistical distribution graphs and correlation heatmaps." },
    ],
  },
  {
    category: "MACHINE LEARNING",
    code: "03 // ML",
    accent: "#9dfc3f",
    description: "Supervised predictive modeling, cross-validation paradigms, and rigorous diagnostic evaluation.",
    skills: [
      { name: "Classification", verification: "Ensemble trees, Support Vector Machines, and regularized logistic classifiers." },
      { name: "Regression", verification: "Continuous outcome estimation and residual loss analysis." },
      { name: "Cross-validation", verification: "Stratified k-fold validation preventing evaluation variance." },
      { name: "Feature Engineering", verification: "Zero-leakage behavioral extraction and domain-specific feature synthesis." },
      { name: "Model Evaluation", verification: "PR-AUC, F1-macro, ROC analysis, and cost-sensitive confusion matrices." },
    ],
  },
  {
    category: "OPTIMISATION & XAI",
    code: "04 // XAI",
    accent: "#ffd23a",
    description: "Bayesian optimization and game-theoretic explainability applied to imbalanced tabular datasets.",
    skills: [
      { name: "Optuna", verification: "Bayesian hyperparameter search balancing multi-metric objectives (Journal Paper)." },
      { name: "SMOTE-NC", verification: "Synthetic minority oversampling for mixed continuous and categorical spaces." },
      { name: "Threshold Optimisation", verification: "Cost-sensitive classification tuning minimizing enterprise false-negative loss." },
      { name: "SHAP (Tree & Kernel)", verification: "Global summary, beeswarm, and local waterfall attribution auditing." },
    ],
  },
  {
    category: "FINANCIAL ANALYTICS",
    code: "05 // QUANT",
    accent: "#3ad7ff",
    description: "Quantitative analysis of portfolio holdings, sector exposure distributions, and financial data modeling.",
    skills: [
      { name: "Portfolio Analytics", verification: "Asset weight calculations, market value aggregations, and performance tracking." },
      { name: "Financial Data Analysis", verification: "Cleansed operational transaction datasets and client account balances." },
      { name: "Risk Metrics", verification: "Portfolio sector concentration thresholds and single-holding exposure limits." },
      { name: "Quantitative Research Fundamentals", verification: "Statistical hypothesis formulation and repeatable empirical validation." },
    ],
  },
  {
    category: "GENAI & AUTOMATION",
    code: "06 // AGENTS",
    accent: "#ff2e97",
    description: "Large Language Model interfaces, deterministic agent routing, and enterprise workflow automation.",
    skills: [
      { name: "LLM APIs", verification: "Gemini API integration for structured JSON responses and intent classification." },
      { name: "Prompt Engineering", verification: "Few-shot calibration, system constraints, and schema-grounded prompting." },
      { name: "Agentic Workflows", verification: "Deterministic intent routing, tool selection, and parameter extraction." },
      { name: "AiSensy", verification: "Automated business messaging pipelines configured at Choice India." },
    ],
  },
  {
    category: "BI & ENGINEERING",
    code: "07 // OPS",
    accent: "#ff6a1a",
    description: "Enterprise business intelligence dashboards, dimensional modeling, and developer tooling.",
    skills: [
      { name: "Power BI", verification: "11 interactive production dashboards deployed at Choice India with complex DAX." },
      { name: "Zoho Analytics", verification: "Automated C-suite reporting delivered at a ~3 reports/week cadence." },
      { name: "Excel (VBA)", verification: "Advanced spreadsheet modeling, pivot reconciliations, and macro routines." },
      { name: "Git & GitHub", verification: "Version control, collaborative pull requests, and open-source documentation." },
      { name: "REST APIs", verification: "HTTP endpoint consumption and JSON data synchronization." },
    ],
  },
];

export const skillCategories: SkillCategory[] = verifiedSkillsData.map((g) => ({
  id: g.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  name: g.category,
  color: g.accent,
  description: g.description,
  skills: g.skills.map((s) => ({
    name: s.name,
    verification: s.verification,
    level: 90,
  })),
}));
