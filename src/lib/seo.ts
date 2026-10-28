import { siteConfig } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { skillCategories } from "@/lib/data/skills";
import { experiences } from "@/lib/data/site";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressCountry: "IN",
    },
    email: siteConfig.email,
    url: "https://harshkhamkar.dev",
    sameAs: [siteConfig.linkedin, siteConfig.github],
    knowsAbout: siteConfig.keywords,
  };
}

export function projectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.title,
        description: p.description,
        keywords: p.tags.join(", "),
        url: `https://harshkhamkar.dev/projects/${p.slug}`,
      },
    })),
  };
}

export function skillsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Technical Skills",
    itemListElement: skillCategories.flatMap((cat, ci) =>
      cat.skills.map((skill, si) => ({
        "@type": "ListItem",
        position: ci * 10 + si + 1,
        item: {
          "@type": "DefinedTerm",
          name: skill.name,
          description: `${cat.name} — ${skill.level}% proficiency`,
        },
      }))
    ),
  };
}

export function experienceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: experiences.map((exp, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "OrganizationRole",
        roleName: exp.role,
        startDate: exp.period,
        worksFor: { "@type": "Organization", name: exp.company },
      },
    })),
  };
}
