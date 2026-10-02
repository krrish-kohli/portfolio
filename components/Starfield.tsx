"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  amp: number;
  phase: number;
  speed: number;
  hue: number;
  depth: number;
};

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const build = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(420, Math.floor((w * h) / 3800));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        base: 0.3 + Math.random() * 0.5,
        amp: 0.12 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        hue: Math.random(),
        depth: 0.3 + Math.random() * 0.7,
      }));
    };

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5;
      meteors.push({
        x: fromLeft ? Math.random() * w * 0.3 : w * (0.7 + Math.random() * 0.3),
        y: Math.random() * h * 0.35,
        vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 4),
        vy: 2.5 + Math.random() * 2,
        life: 0,
        maxLife: 60 + Math.random() * 30,
      });
    };

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY || 0;

      for (const s of stars) {
        const alpha = Math.max(
          0.05,
          Math.min(1, s.base + Math.sin(t * s.speed + s.phase) * s.amp),
        );
        const y = (((s.y - scroll * s.depth * 0.15) % h) + h) % h;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle =
          s.hue > 0.85
            ? `rgba(165,180,252,${alpha})`
            : s.hue > 0.7
              ? `rgba(103,232,249,${alpha})`
              : `rgba(226,232,240,${alpha})`;
        ctx.fill();
      }

      if (!reduced) {
        if (Math.random() < 0.004 && meteors.length < 2) spawnMeteor();
        meteors = meteors.filter((m) => m.life < m.maxLife);
        for (const m of meteors) {
          m.x += m.vx;
          m.y += m.vy;
          m.life += 1;
          const fade = 1 - m.life / m.maxLife;
          const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
          grad.addColorStop(0, `rgba(255,255,255,${0.85 * fade})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
          ctx.stroke();
        }
        raf = requestAnimationFrame(draw);
      }
    };

    build();
    draw();

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
