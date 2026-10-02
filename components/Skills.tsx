const skillGroups = [
  {
    title: "Languages",
    subtitle: "Systems & scripting",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
    skills: ["Python", "JavaScript", "C++", "C", "TypeScript", "C#", "Java", "SQL"],
  },
  {
    title: "Data, AI & ML",
    subtitle: "Models & pipelines",
    icon: (
      <>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
    skills: [
      "Pandas",
      "NumPy",
      "scikit-learn",
      "SciPy",
      "Matplotlib",
      "Apache Spark",
      "Apache Airflow",
      "LLM APIs",
      "RAG Workflows",
      "Data Modeling",
      "ETL",
    ],
  },
  {
    title: "Web & App Frameworks",
    subtitle: "Full-stack apps",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
    skills: ["React", "Node.js", "Express.js", "EJS", "HTML", "CSS", "REST APIs", "Streamlit", "Gradio"],
  },
  {
    title: "Databases",
    subtitle: "Storage & retrieval",
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
        <path d="M3 12a9 3 0 0 0 18 0" />
      </>
    ),
    skills: ["MongoDB", "Neo4j", "Relational Databases (SQL)"],
  },
  {
    title: "Infrastructure & Tools",
    subtitle: "Daily workflow",
    icon: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
    skills: [
      "Git",
      "GitHub",
      "Linux/Unix",
      "Docker",
      "CI/CD Basics",
      "Cloud Fundamentals (AWS, Azure, GCP)",
    ],
  },
  {
    title: "Currently Exploring",
    subtitle: "Next frontier",
    icon: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </>
    ),
    skills: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora">
          03 · Instruments
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          My <span className="text-gradient">Skillset</span>
        </h2>
        <p className="mt-4 max-w-2xl text-star/60">
          The tools I reach for when turning ambiguous requirements into
          working software.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-aurora/15 to-nebula/15 text-aurora">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {group.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {group.title}
              </h3>
              <p className="text-xs text-star/50">{group.subtitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-star/70"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
