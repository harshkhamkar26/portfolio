export type SkillCategory = {
  id: string;
  name: string;
  color: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "data-science",
    name: "Data Science",
    color: "#6366f1",
    skills: [
      { name: "Statistics", level: 92 },
      { name: "Hypothesis Testing", level: 88 },
      { name: "Feature Engineering", level: 90 },
      { name: "A/B Testing", level: 85 },
    ],
  },
  {
    id: "ml",
    name: "Machine Learning",
    color: "#8b5cf6",
    skills: [
      { name: "Scikit-learn", level: 94 },
      { name: "XGBoost", level: 88 },
      { name: "Deep Learning", level: 82 },
      { name: "SHAP / XAI", level: 90 },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    color: "#06b6d4",
    skills: [
      { name: "Business Intelligence", level: 93 },
      { name: "KPI Design", level: 91 },
      { name: "Cohort Analysis", level: 89 },
      { name: "Forecasting", level: 87 },
    ],
  },
  {
    id: "viz",
    name: "Visualization",
    color: "#10b981",
    skills: [
      { name: "Power BI", level: 95 },
      { name: "Tableau", level: 88 },
      { name: "Matplotlib", level: 90 },
      { name: "Plotly", level: 86 },
    ],
  },
  {
    id: "programming",
    name: "Programming",
    color: "#f59e0b",
    skills: [
      { name: "Python", level: 96 },
      { name: "SQL", level: 94 },
      { name: "R", level: 80 },
      { name: "TypeScript", level: 78 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Big Data",
    color: "#ec4899",
    skills: [
      { name: "AWS", level: 82 },
      { name: "Spark", level: 75 },
      { name: "Docker", level: 78 },
      { name: "Git", level: 92 },
    ],
  },
];
