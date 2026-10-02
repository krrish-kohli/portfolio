import Image from "next/image";
import type { CSSProperties } from "react";

const RESUME_URL = "/Krrish_Kohli_Resume.pdf";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-28 pt-32 md:grid-cols-[1.25fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-star/70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Long Beach, CA
            </span>
          </div>

          <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            I&rsquo;m Krrish.
            <span className="text-gradient mt-2 block">
              Software & AI/ML Engineer.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-star/70">
            Honors Computer Science undergraduate (GPA 3.9, May 2027) building
            production-minded software across backend APIs, data pipelines, and
            applied machine learning — from LLM/RAG workflows and evaluation
            harnesses to radar-based research and real-time web apps.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-aurora to-nebula px-6 font-medium text-space-950 shadow-[0_0_28px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.03]"
            >
              View Projects
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 font-medium text-star transition-colors hover:border-white/30 hover:bg-white/10"
            >
              Resume
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        <div className="relative mx-auto hidden h-72 w-72 sm:block lg:h-80 lg:w-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora/25 to-nebula/25 blur-2xl" />
          <div className="absolute -inset-4 rounded-full border border-white/10" />
          <div className="absolute -inset-10 rounded-full border border-white/5" />
          <div className="animate-float-y relative h-full w-full overflow-hidden rounded-full border border-white/15 shadow-[0_0_60px_rgba(139,92,246,0.35)]">
            <Image
              src="/avatar.jpg"
              alt="Portrait of Krrish Kohli"
              fill
              sizes="(max-width: 1024px) 288px, 320px"
              priority
              className="object-cover"
            />
          </div>
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full bg-aurora shadow-[0_0_14px_rgba(34,211,238,0.9)]"
            style={{ "--orbit-r": "176px" } as CSSProperties}
          />
          <span
            className="animate-orbit absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-nebula shadow-[0_0_12px_rgba(139,92,246,0.9)]"
            style={{ "--orbit-r": "208px", animationDirection: "reverse", animationDuration: "22s" } as CSSProperties}
          />
        </div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-star/50 transition-colors hover:text-star"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll to explore
        </span>
        <svg className="animate-bounce-soft" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
