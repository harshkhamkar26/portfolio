import { HomeClient } from "@/components/home-client";
import {
  personSchema,
  projectsSchema,
  skillsSchema,
  experienceSchema,
} from "@/lib/seo";

export default function HomePage() {
  const schemas = [personSchema(), projectsSchema(), skillsSchema(), experienceSchema()];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomeClient />
    </>
  );
}
