const entries = [
  {
    role: "Data Engineering Intern",
    org: "Springer Capital",
    period: "Feb 2026 – May 2026",
    points: [
      "Supported design and maintenance of data pipelines and ETL workflows, including data cleaning, validation, and preprocessing for accuracy.",
      "Translated stakeholder data requirements into reliable datasets and documented data flows for repeatable downstream use.",
      "Monitored pipelines, troubleshooted failures, and improved storage/retrieval efficiency using SQL, Apache Spark, and Apache Airflow.",
    ],
  },
  {
    role: "AI Studio Fellow",
    org: "Brightside Health",
    period: "Aug 2025 – Dec 2025",
    points: [
      "Built and deployed a prototype enabling clinicians to explore evidence extracted from research papers, using Streamlit and Python.",
      "Built a pipeline converting papers into machine-readable text and extracting entities (conditions, symptoms, treatments) into structured JSON.",
      "Implemented a human-in-the-loop and LLM-as-a-judge workflow to reduce hallucinations and improve fidelity to source material.",
      "Generated knowledge-graph-style representations to support navigation and decision workflows, documenting usage and limitations.",
    ],
  },
  {
    role: "Research Assistant",
    org: "California State University, Long Beach",
    period: "Nov 2024 – Dec 2025",
    points: [
      "Developed predictive ML models to detect stroke survivor fall risks using motion data from 500+ patients, improving prediction accuracy by 20%.",
      "Optimized feature selection to reduce compute time by 35% while maintaining 92% accuracy, evaluating sensitivity and error tradeoffs.",
      "Processed and analyzed gait and postural stability signals using scikit-learn, SciPy, and pandas for feature extraction and analysis.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora">
          02 · Trajectory
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Work <span className="text-gradient">Experience</span>
        </h2>

        <div className="relative mt-12">
          <div
            className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-aurora/60 via-nebula/40 to-transparent"
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {entries.map((entry) => (
              <li key={entry.role} className="relative pl-10">
                <span
                  className="absolute left-2 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-space-950 bg-gradient-to-br from-aurora to-nebula shadow-[0_0_16px_rgba(139,92,246,0.6)]"
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {entry.role}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-widest text-aurora">
                    {entry.period}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-nebula">{entry.org}</p>
                <ul className="mt-3 space-y-2">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 leading-7 text-star/65"
                    >
                      <span
                        className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-star/40"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
