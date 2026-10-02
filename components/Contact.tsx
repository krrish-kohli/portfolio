export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-full flex-col px-6 pb-6 pt-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora">
          05 · Transmission
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
          Let&rsquo;s <span className="text-gradient">Connect.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-star/65">
          I&rsquo;m actively looking for software engineering and AI/ML
          internships and new-grad roles. Whether you have an opportunity or
          just want to talk space, code, or coffee — my inbox is open.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:krrishkohli15@gmail.com"
            className="flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-aurora to-nebula px-7 font-medium text-space-950 shadow-[0_0_28px_rgba(139,92,246,0.35)] transition-transform hover:scale-[1.03]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            krrishkohli15@gmail.com
          </a>
          <a
            href="tel:+15625642005"
            className="flex h-12 items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 font-medium transition-colors hover:border-white/30 hover:bg-white/10"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (562) 564-2005
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <a
            href="https://github.com/krrish-kohli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-star/70 transition-all hover:border-white/30 hover:text-star"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/krrish-kohli-16b3aa310"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-star/70 transition-all hover:border-white/30 hover:text-star"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
        </div>

        <div className="mt-auto pt-12">
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-sm text-star/50 sm:flex-row">
            <p>© 2026 Krrish Kohli · Long Beach, CA</p>
            <p>
              Built with{" "}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-star/70 transition-colors hover:text-star"
              >
                Next.js
              </a>{" "}
              &{" "}
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-star/70 transition-colors hover:text-star"
              >
                Tailwind CSS
              </a>{" "}
              · among the stars
            </p>
            <a
              href="#top"
              className="flex items-center gap-1.5 transition-colors hover:text-star"
            >
              Back to top
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
