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
};

export const projects: Project[] = [
  {
    slug: "student-performance-xai",
    title: "Student Performance Analysis using Explainable AI",
    subtitle: "SHAP-driven interpretability for educational outcomes",
    description:
      "Built an end-to-end ML pipeline predicting student performance with full model interpretability using SHAP values, enabling educators to understand feature impact.",
    tags: ["Machine Learning", "SHAP", "XAI", "Education"],
    metrics: [
      { label: "Model Accuracy", value: "91.2%" },
      { label: "Features Analyzed", value: "24" },
      { label: "SHAP Insights", value: "100+" },
    ],
    technologies: ["Python", "Scikit-learn", "SHAP", "Pandas", "Streamlit"],
    challenges: [
      "Black-box models lacked trust from academic stakeholders.",
      "High-dimensional feature interactions were difficult to explain.",
    ],
    solutions: [
      "Implemented TreeSHAP for global and local explanations.",
      "Built interactive dashboards surfacing top predictive drivers.",
    ],
    results: [
      "Achieved 91.2% prediction accuracy with full transparency.",
      "Enabled data-driven intervention strategies for at-risk students.",
    ],
    featured: true,
    gradient: "from-violet-600/40 via-indigo-500/20 to-cyan-500/30",
  },
  {
    slug: "financial-analytics-dashboard",
    title: "Financial Analytics Dashboard",
    subtitle: "Real-time executive intelligence platform",
    description:
      "Designed a Power BI and Python-powered financial analytics suite delivering real-time KPIs, variance analysis, and drill-down capabilities for leadership.",
    tags: ["Power BI", "Finance", "Dashboard", "SQL"],
    metrics: [
      { label: "KPIs Tracked", value: "35+" },
      { label: "Report Time Saved", value: "60%" },
      { label: "Data Sources", value: "8" },
    ],
    technologies: ["Power BI", "SQL", "Python", "DAX", "Azure"],
    challenges: [
      "Fragmented financial data across multiple systems.",
      "Manual reporting consumed 15+ hours weekly.",
    ],
    solutions: [
      "Unified ETL pipeline consolidating disparate sources.",
      "Automated refresh schedules with anomaly detection alerts.",
    ],
    results: [
      "Reduced reporting cycle from days to real-time.",
      "Improved forecast accuracy by 23% through unified metrics.",
    ],
    featured: true,
    gradient: "from-emerald-600/40 via-teal-500/20 to-cyan-500/30",
  },
  {
    slug: "customer-segmentation-ml",
    title: "Customer Segmentation using Machine Learning",
    subtitle: "RFM + clustering for precision marketing",
    description:
      "Developed unsupervised and supervised segmentation models combining RFM analysis with K-Means and hierarchical clustering for targeted campaigns.",
    tags: ["Clustering", "Marketing", "RFM", "Python"],
    metrics: [
      { label: "Segments Identified", value: "6" },
      { label: "Campaign ROI Lift", value: "34%" },
      { label: "Customers Analyzed", value: "50K+" },
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "Plotly", "SQL"],
    challenges: [
      "Homogeneous customer base masked high-value micro-segments.",
      "Marketing spend was not optimized by customer lifetime value.",
    ],
    solutions: [
      "Engineered RFM features with PCA dimensionality reduction.",
      "Validated clusters with silhouette scores and business rules.",
    ],
    results: [
      "Increased campaign conversion by 34% through targeted outreach.",
      "Identified 3 previously hidden high-LTV customer segments.",
    ],
    featured: true,
    gradient: "from-pink-600/40 via-rose-500/20 to-orange-500/30",
  },
  {
    slug: "sales-forecasting-system",
    title: "Sales Forecasting System",
    subtitle: "Time-series ML for revenue prediction",
    description:
      "Architected a production-grade forecasting system using ARIMA, Prophet, and gradient boosting ensembles with automated model selection.",
    tags: ["Forecasting", "Time Series", "ML", "Analytics"],
    metrics: [
      { label: "MAPE Reduction", value: "28%" },
      { label: "Horizon", value: "12 mo" },
      { label: "Models Ensembled", value: "4" },
    ],
    technologies: ["Python", "Prophet", "XGBoost", "Statsmodels", "FastAPI"],
    challenges: [
      "Seasonality and promotional spikes degraded single-model accuracy.",
      "Stakeholders needed confidence intervals, not point estimates.",
    ],
    solutions: [
      "Built stacked ensemble with weighted model selection.",
      "Delivered probabilistic forecasts with 95% confidence bands.",
    ],
    results: [
      "Reduced MAPE from 18.4% to 13.2% across product lines.",
      "Enabled inventory optimization saving an estimated 15% in holding costs.",
    ],
    featured: true,
    gradient: "from-amber-600/40 via-yellow-500/20 to-lime-500/30",
  },
  {
    slug: "ai-analytics-assistant",
    title: "AI-Powered Analytics Assistant",
    subtitle: "Natural language interface for business data",
    description:
      "Created an AI assistant enabling non-technical users to query datasets in natural language, generating SQL, visualizations, and narrative insights automatically.",
    tags: ["AI", "NLP", "LLM", "Analytics"],
    metrics: [
      { label: "Query Accuracy", value: "87%" },
      { label: "Time to Insight", value: "-75%" },
      { label: "Users Supported", value: "25+" },
    ],
    technologies: ["Python", "LangChain", "OpenAI API", "SQL", "Streamlit"],
    challenges: [
      "Business users lacked SQL skills for self-serve analytics.",
      "Ad-hoc data requests created bottlenecks for the analytics team.",
    ],
    solutions: [
      "RAG pipeline over schema documentation and sample queries.",
      "Guardrails for SQL validation and result explanation.",
    ],
    results: [
      "Reduced average time-to-insight from 2 hours to 30 minutes.",
      "Democratized analytics access across 25+ business users.",
    ],
    featured: true,
    gradient: "from-blue-600/40 via-indigo-500/20 to-violet-500/30",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
