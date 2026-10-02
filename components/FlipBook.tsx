"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

const PAGE_IDS = [
  "top",
  "projects",
  "experience",
  "skills",
  "education",
  "contact",
];

const PAGE_LABELS = [
  "Home",
  "Projects",
  "Experience",
  "Skills",
  "Education",
  "Contact",
];

export default function FlipBook({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLElement | null>(null);
  const flipRef = useRef<((index: number, instant?: boolean) => void) | null>(
    null,
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const pages = Array.from(
      stage.querySelectorAll<HTMLElement>(
        ":scope > section, :scope > footer",
      ),
    );
    if (!pages.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const currentRef = { index: 0 };
    const animatingRef = { value: false };
    const revealedRef = new Set<number>([0]);
    let cooldownUntil = 0;

    gsap.set(pages, { autoAlpha: 0 });
    gsap.set(pages[0], { autoAlpha: 1, zIndex: 2 });

    const revealPage = (page: HTMLElement) => {
      const index = pages.indexOf(page);
      if (revealedRef.has(index)) return;
      revealedRef.add(index);
      const container = page.querySelector<HTMLElement>(":scope > div");
      if (container && page.id !== "top") {
        gsap.from(container.children, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        });
      }
    };

    const setPage = (index: number) => {
      setActive(index);
      window.dispatchEvent(new CustomEvent("flipbook:page", { detail: index }));
    };

    const updateHash = (index: number) => {
      const id = pages[index].id;
      if (id && id !== "top") {
        window.history.replaceState(null, "", `#${id}`);
      } else {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };

    const flipTo = (index: number, instant = false) => {
      if (
        index === currentRef.index ||
        index < 0 ||
        index >= pages.length ||
        animatingRef.value
      ) {
        return;
      }
      const outgoing = pages[currentRef.index];
      const incoming = pages[index];
      const down = index > currentRef.index;
      currentRef.index = index;
      setPage(index);
      updateHash(index);
      cooldownUntil = performance.now() + 650;

      if (instant) {
        gsap.set(outgoing, {
          autoAlpha: 0,
          rotationX: 0,
          scale: 1,
          zIndex: 0,
        });
        gsap.set(incoming, {
          autoAlpha: 1,
          rotationX: 0,
          scale: 1,
          zIndex: 2,
        });
        revealedRef.add(pages.indexOf(incoming));
        return;
      }

      animatingRef.value = true;
      if (down) incoming.scrollTop = 0;

      gsap.set(incoming, {
        autoAlpha: 1,
        zIndex: down ? 1 : 2,
        backgroundColor: "#05060f",
      });
      gsap.set(outgoing, {
        autoAlpha: 1,
        zIndex: down ? 2 : 1,
        backgroundColor: "#05060f",
      });
      revealPage(incoming);

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(outgoing, {
            autoAlpha: 0,
            rotationX: 0,
            scale: 1,
            zIndex: 0,
            backgroundColor: "rgba(0,0,0,0)",
          });
          gsap.set(incoming, { zIndex: 2, backgroundColor: "rgba(0,0,0,0)" });
          animatingRef.value = false;
        },
      });

      if (down) {
        tl.to(
          outgoing,
          {
            rotationX: -100,
            transformOrigin: "50% 0%",
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        ).fromTo(
          incoming,
          { scale: 0.97 },
          { scale: 1, duration: 1, ease: "power2.inOut" },
          0,
        );
      } else {
        tl.fromTo(
          incoming,
          {
            rotationX: -100,
            transformOrigin: "50% 0%",
            duration: 1,
            ease: "power2.inOut",
          },
          { rotationX: 0, duration: 1, ease: "power2.inOut" },
          0,
        );
      }
    };

    flipRef.current = flipTo;

    const goNext = () => flipTo(currentRef.index + 1);
    const goPrev = () => flipTo(currentRef.index - 1);

    const atEdge = (page: HTMLElement, direction: number) => {
      if (direction > 0) {
        return page.scrollTop + page.clientHeight >= page.scrollHeight - 1;
      }
      return page.scrollTop <= 1;
    };

    const onWheel = (e: WheelEvent) => {
      if (animatingRef.value || performance.now() < cooldownUntil) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (!atEdge(pages[currentRef.index], Math.sign(e.deltaY))) return;
      e.preventDefault();
      if (e.deltaY > 20) goNext();
      else if (e.deltaY < -20) goPrev();
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (animatingRef.value) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy)) return;
      if (!atEdge(pages[currentRef.index], -Math.sign(dy))) return;
      if (e.cancelable) e.preventDefault();
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (performance.now() < cooldownUntil) return;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (animatingRef.value) return;
      if (dy < -60) goNext();
      else if (dy > 60) goPrev();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        flipTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        flipTo(pages.length - 1);
      }
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const index = pages.findIndex((page) => page.id === id);
      if (index === -1) return;
      e.preventDefault();
      if (animatingRef.value) return;
      flipTo(index);
    };

    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      const index = pages.findIndex((page) => page.id === initialHash);
      if (index > 0) flipTo(index, true);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const jump = (index: number) => {
    flipRef.current?.(index);
  };

  return (
    <>
      <main ref={stageRef} className="flip-stage">
        {children}
      </main>
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      >
        {PAGE_IDS.map((id, index) => (
          <button
            key={id}
            type="button"
            onClick={() => jump(index)}
            aria-label={PAGE_LABELS[index]}
            title={PAGE_LABELS[index]}
            className={`rounded-full transition-all duration-300 ${
              active === index
                ? "h-2.5 w-2.5 scale-110 bg-gradient-to-r from-aurora to-nebula shadow-[0_0_10px_rgba(139,92,246,0.7)]"
                : "h-2 w-2 bg-white/20 hover:bg-white/50"
            }`}
          />
        ))}
      </nav>
    </>
  );
}
