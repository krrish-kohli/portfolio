"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import gsap from "gsap";

const projects = [
  {
    name: "Clinical Interaction Knowledge Graph",
    tag: "AI · RAG",
    description:
      "End-to-end pipeline that ingests unstructured documents, extracts structured entities and relationships, and persists them in Neo4j — with RAG-style retrieval, schema validation, and an evaluation harness benchmarking extraction quality.",
    tech: ["Python", "Neo4j", "Docker", "React"],
    url: "https://github.com/krrish-kohli",
  },
  {
    name: "FableFrog AI",
    tag: "LLM App",
    description:
      "AI storytelling app that generates narratives with an LLM and converts them to audio via ElevenLabs, delivered through a Gradio UI with end-to-end API integration.",
    tech: ["Python", "OpenAI API", "ElevenLabs", "Gradio"],
    url: "https://github.com/krrish-kohli/FableFrog-AI",
  },
  {
    name: "EyeTalk",
    tag: "AI · Accessibility",
    description:
      "Gaze-powered keyboard that lets people with limited motor control type with their eyes — webcam gaze tracking, blink-to-select input, and natural voice feedback via text-to-speech.",
    tech: ["Python", "OpenCV", "dlib", "ElevenLabs TTS"],
    url: "https://github.com/krrish-kohli/EyeTalk",
  },
  {
    name: "Contact-Free Mobility Screening",
    tag: "Research · AI/ML",
    description:
      "60 GHz FMCW radar system that automates the Five-Times Sit-to-Stand test for fall-risk screening — real-time signal processing under 20 ms per frame with clinically validated accuracy.",
    tech: ["Python", "NumPy", "SciPy", "60 GHz Radar"],
    url: "https://github.com/krrish-kohli/Contact-Free-Mobility-Screening-Research",
  },
  {
    name: "MERN Chat App",
    tag: "Full-Stack",
    description:
      "Real-time chat application with instant messaging over Socket.IO, persistent conversation history in MongoDB, and a responsive React interface.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    url: "https://github.com/krrish-kohli/MERN-Chat-App",
  },
  {
    name: "InkFlow",
    tag: "Full-Stack",
    description:
      "Full-stack blogging platform with secure authentication via Passport.js, Cloudinary-backed media uploads, and complete CRUD for posts and comments.",
    tech: ["Node.js", "Express", "MongoDB", "Passport.js", "Cloudinary", "EJS"],
    url: "https://github.com/krrish-kohli/InkFlow",
  },
];

const COUNT = projects.length;
const ANGLE = 360 / COUNT;
const DRAG_FACTOR = ANGLE / 420;
const SPREAD = 1.4;
const HIDE_ANGLE = 100;

export default function Projects() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const radiusRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const pageActiveRef = useRef(false);
  const settleTweenRef = useRef<gsap.core.Tween | null>(null);
  const momentumTickRef = useRef<((time: number, delta: number) => void) | null>(
    null,
  );
  const snapTimerRef = useRef<number | null>(null);
  const dragRef = useRef({
    down: false,
    startX: 0,
    startRot: 0,
    lastT: 0,
    lastRot: 0,
    moved: false,
  });
  const [active, setActive] = useState(0);

  const applyTransforms = useCallback(() => {
    const radius = radiusRef.current;
    const rotation = rotationRef.current;
    cardsRef.current.forEach((card, i) => {
      const raw = i * ANGLE + rotation;
      const norm = ((raw % 360) + 360) % 360;
      const offset = norm > 180 ? norm - 360 : norm;
      const abs = Math.abs(offset);
      if (abs >= HIDE_ANGLE) {
        card.style.opacity = "0";
        card.style.visibility = "hidden";
        return;
      }
      const t = Math.min(abs / 90, 1);
      const scale = 1 - t * 0.18;
      const opacity =
        abs <= 90 ? 1 - t * 0.4 : Math.max(0, 0.6 * (1 - (abs - 90) / 10));
      card.style.visibility = "visible";
      card.style.opacity = opacity.toFixed(3);
      card.style.transform = `rotateY(${offset.toFixed(3)}deg) translateZ(${radius.toFixed(2)}px) scale(${scale.toFixed(3)})`;
    });
  }, []);

  const frontIndex = useCallback(() => {
    const raw = Math.round(-rotationRef.current / ANGLE);
    return ((raw % COUNT) + COUNT) % COUNT;
  }, []);

  const nearestRotationFor = useCallback((index: number) => {
    const base = -index * ANGLE;
    const currentNorm = ((rotationRef.current % 360) + 360) % 360;
    const targetNorm = ((base % 360) + 360) % 360;
    let diff = targetNorm - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return rotationRef.current + diff;
  }, []);

  const settle = useCallback(() => {
    const target = Math.round(rotationRef.current / ANGLE) * ANGLE;
    if (Math.abs(target - rotationRef.current) < 0.01) {
      rotationRef.current = target;
      applyTransforms();
      setActive(frontIndex());
      return;
    }
    const obj = { r: rotationRef.current };
    settleTweenRef.current?.kill();
    settleTweenRef.current = gsap.to(obj, {
      r: target,
      duration: 0.55,
      ease: "power3.out",
      onUpdate: () => {
        rotationRef.current = obj.r;
        applyTransforms();
      },
      onComplete: () => {
        rotationRef.current = target;
        applyTransforms();
        setActive(frontIndex());
      },
    });
  }, [applyTransforms, frontIndex]);

  const stopMomentum = useCallback(() => {
    if (momentumTickRef.current) {
      gsap.ticker.remove(momentumTickRef.current);
      momentumTickRef.current = null;
    }
  }, []);

  const startMomentum = useCallback(() => {
    stopMomentum();
    const onTick = (_time: number, deltaMS: number) => {
      const dt = Math.min(deltaMS, 64) / 1000;
      rotationRef.current += velocityRef.current * dt;
      velocityRef.current *= Math.pow(0.02, dt);
      applyTransforms();
      const fi = frontIndex();
      setActive((prev) => (prev === fi ? prev : fi));
      if (Math.abs(velocityRef.current) < 30) {
        stopMomentum();
        settle();
      }
    };
    momentumTickRef.current = onTick;
    gsap.ticker.add(onTick);
  }, [applyTransforms, frontIndex, settle, stopMomentum]);

  const goTo = useCallback(
    (index: number) => {
      stopMomentum();
      velocityRef.current = 0;
      const target = nearestRotationFor(index);
      if (Math.abs(target - rotationRef.current) < 0.01) {
        rotationRef.current = target;
        applyTransforms();
        setActive(frontIndex());
        return;
      }
      const obj = { r: rotationRef.current };
      settleTweenRef.current?.kill();
      settleTweenRef.current = gsap.to(obj, {
        r: target,
        duration: 0.7,
        ease: "power3.out",
        onUpdate: () => {
          rotationRef.current = obj.r;
          applyTransforms();
        },
        onComplete: () => {
          rotationRef.current = target;
          applyTransforms();
          setActive(frontIndex());
        },
      });
    },
    [nearestRotationFor, applyTransforms, frontIndex, stopMomentum],
  );

  const measure = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const width = ring.offsetWidth;
    radiusRef.current = (width / 2 / Math.sin(Math.PI / COUNT)) * SPREAD;
    gsap.set(ring, { z: -radiusRef.current });
    cardsRef.current = Array.from(
      ring.querySelectorAll<HTMLElement>("article"),
    );
    applyTransforms();
  }, [applyTransforms]);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;

    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const onPage = (e: Event) => {
      pageActiveRef.current = (e as CustomEvent<number>).detail === 1;
    };
    window.addEventListener("flipbook:page", onPage);

    const onWheel = (e: WheelEvent) => {
      if (!pageActiveRef.current) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      stopMomentum();
      settleTweenRef.current?.kill();
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
      velocityRef.current = 0;
      rotationRef.current += e.deltaX * DRAG_FACTOR * 0.6;
      applyTransforms();
      setActive(frontIndex());
      snapTimerRef.current = window.setTimeout(() => {
        snapTimerRef.current = null;
        settle();
      }, 180);
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("flipbook:page", onPage);
      stopMomentum();
      settleTweenRef.current?.kill();
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
    };
  }, [measure, settle, stopMomentum, applyTransforms, frontIndex]);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    stopMomentum();
    settleTweenRef.current?.kill();
    if (snapTimerRef.current) {
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    velocityRef.current = 0;
    dragRef.current = {
      down: true,
      startX: e.clientX,
      startRot: rotationRef.current,
      lastT: performance.now(),
      lastRot: rotationRef.current,
      moved: false,
    };
    stage.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 4) drag.moved = true;
    const now = performance.now();
    const dt = Math.max(1, now - drag.lastT);
    rotationRef.current = drag.startRot + dx * DRAG_FACTOR;
    const instant = ((rotationRef.current - drag.lastRot) / dt) * 1000;
    velocityRef.current = velocityRef.current * 0.7 + instant * 0.3;
    drag.lastRot = rotationRef.current;
    drag.lastT = now;
    applyTransforms();
    const fi = frontIndex();
    setActive((prev) => (prev === fi ? prev : fi));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (!drag.down) return;
    drag.down = false;
    if (stage?.hasPointerCapture(e.pointerId)) {
      stage.releasePointerCapture(e.pointerId);
    }
    if (!drag.moved || Math.abs(velocityRef.current) <= 60) {
      settle();
      return;
    }
    startMomentum();
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section id="projects" className="relative flex min-h-full flex-col py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-aurora">
          01 · Missions
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="mt-3 max-w-2xl text-star/60">
          A selection of work spanning applied AI/ML, research engineering, and
          full-stack development — drag the cylinder or use the arrows.
        </p>

        <div className="mt-8 flex-1">
          <div
            ref={stageRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClickCapture={onClickCapture}
            className="relative h-[350px] cursor-grab select-none overflow-hidden"
            style={{ perspective: "3200px", touchAction: "pan-y" }}
          >
            <div
              ref={ringRef}
              className="absolute inset-0 h-full w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="glass absolute inset-0 flex flex-col overflow-hidden rounded-2xl p-7 transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] md:p-8"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-star/60">
                      {project.tag}
                    </span>
                  </div>
                  <p className="mt-3 line-clamp-4 max-w-3xl flex-1 text-base leading-7 text-star/65">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-star/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-aurora transition-colors hover:text-star"
                    >
                      View on GitHub
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17 17 7M7 7h10v10" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${project.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index
                    ? "w-6 bg-gradient-to-r from-aurora to-nebula"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(frontIndex() - 1)}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-star/70 transition-all hover:border-white/30 hover:text-star"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(frontIndex() + 1)}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-star/70 transition-all hover:border-white/30 hover:text-star"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/krrish-kohli?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Explore all repositories
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
