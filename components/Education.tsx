const credentials = [
  {
    title: "B.S. Computer Science, Honors Program",
    org: "California State University, Long Beach",
    period: "Aug 2023 – May 2027",
    icon: (
      <>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </>
    ),
    points: [
      "GPA 3.9 — Member of the President's List.",
      "Coursework: Machine Learning & AI, Algorithms, Data Structures, Software Engineering, Computer Architecture, System Programming, Discrete Structures, Digital Logic, Computer Security & Ethics.",
    ],
  },
  {
    title: "Break Through Tech AI Program",
    org: "Cornell Tech",
    period: "2025 Cohort",
    icon: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </>
    ),
    points: [
      "AI Studio Fellow — selected for Cornell Tech's Break Through Tech AI program.",
      "Studio placement at Brightside Health building applied machine learning with industry mentors.",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora">
          04 · Credentials
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Education <span className="text-gradient">& Credentials</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {credentials.map((credential) => (
            <article
              key={credential.title}
              className="glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-aurora/15 to-nebula/15 text-aurora">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    {credential.icon}
                  </svg>
                </div>
                <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-star/60">
                  {credential.period}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                {credential.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-nebula">
                {credential.org}
              </p>
              <ul className="mt-4 space-y-2">
                {credential.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-7 text-star/65">
                    <span
                      className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-star/40"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
