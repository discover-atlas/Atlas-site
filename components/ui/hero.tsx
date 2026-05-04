"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MoveRight, PhoneCall } from "lucide-react";

/* ── Beam type ── */
interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  layer: number;
}

function createBeam(width: number, height: number, layer: number): Beam {
  const angle = -35 + Math.random() * 10;
  const baseSpeed = 0.15 + layer * 0.18;
  const baseOpacity = 0.06 + layer * 0.04;
  const baseWidth = 8 + layer * 6;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    width: baseWidth,
    length: height * 2.5,
    angle,
    speed: baseSpeed + Math.random() * 0.15,
    opacity: baseOpacity + Math.random() * 0.08,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.008 + Math.random() * 0.012,
    layer,
  };
}

/* ── Hero component ── */
export const PremiumHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [titleNumber, setTitleNumber] = useState(0);

  const LAYERS = 3;
  const BEAMS_PER_LAYER = 8;

  const autoTitles = ["automated", "intelligent", "scalable", "effortless", "unstoppable"];

  /* ── Canvas animation ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const noiseCanvas = noiseRef.current;
    if (!canvas || !noiseCanvas) return;
    const ctx = canvas.getContext("2d");
    const nCtx = noiseCanvas.getContext("2d");
    if (!ctx || !nCtx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      noiseCanvas.width = window.innerWidth * dpr;
      noiseCanvas.height = window.innerHeight * dpr;
      noiseCanvas.style.width = `${window.innerWidth}px`;
      noiseCanvas.style.height = `${window.innerHeight}px`;
      nCtx.setTransform(1, 0, 0, 1, 0, 0);
      nCtx.scale(dpr, dpr);

      /* Reinitialise beams on resize */
      beamsRef.current = [];
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beamsRef.current.push(
            createBeam(window.innerWidth, window.innerHeight, layer)
          );
        }
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* Noise overlay — redrawn each frame for organic grain */
    const generateNoise = () => {
      const imgData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.random() * 255;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 10; /* very subtle */
      }
      nCtx.putImageData(imgData, 0, 0);
    };

    /* Draw a single beam as a blurred gradient rect */
    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = Math.min(
        1,
        beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4)
      );

      /* Orange (#00C9C8) instead of cyan */
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `rgba(0,201,200,0)`);
      gradient.addColorStop(0.2, `rgba(0,201,200,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.5, `rgba(0,201,200,${pulsingOpacity})`);
      gradient.addColorStop(0.8, `rgba(0,201,200,${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(0,201,200,0)`);

      ctx.fillStyle = gradient;
      ctx.filter = `blur(${2 + beam.layer * 2}px)`;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      /* Dark gradient background matching Atlas palette */
      const bg = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      bg.addColorStop(0, "#0a0a0a");
      bg.addColorStop(1, "#111111");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      beamsRef.current.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5);
        beam.pulse += beam.pulseSpeed;
        /* Recycle beam when it scrolls above viewport */
        if (beam.y + beam.length < -50) {
          beam.y = window.innerHeight + 50;
          beam.x = Math.random() * window.innerWidth;
        }
        drawBeam(beam);
      });

      generateNoise();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  /* ── Title cycling ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleNumber((prev) => (prev + 1) % autoTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Layer 0: noise grain */}
      <canvas
        ref={noiseRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Layer 1: beam animation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      {/* Layer 2: content */}
      <div className="relative z-20 flex h-screen w-full items-center justify-center px-6 text-center">
        <div className="container mx-auto flex flex-col items-center gap-10 text-center">

          {/* Eyebrow pill */}
          <Button variant="secondary" size="sm" className="gap-3 text-[#f0ede8]/60">
            Automation Consulting <MoveRight className="w-4 h-4" />
          </Button>

          {/* Headline with animated cycling word */}
          <h1
            className="font-display max-w-3xl leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            <span className="text-[#f0ede8]">Make your business</span>
            <span className="relative flex w-full justify-center overflow-hidden pb-3 pt-1">
              &nbsp;
              {autoTitles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute text-[#00C9C8]"
                  initial={{ opacity: 0, y: "-100" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                  }
                >
                  {title}.
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg leading-relaxed tracking-tight text-[#f0ede8]/40 max-w-xl">
            We build automation systems that eliminate repetitive work, capture every lead,
            and scale your business — without scaling headcount.
          </p>

          {/* CTAs */}
          <div className="flex flex-row gap-3 flex-wrap justify-center">
            <Button
              size="sm"
              className="gap-3"
              variant="outline"
              onClick={() =>
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services <MoveRight className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              className="gap-3 bg-[#00C9C8] text-black hover:bg-[#00b3b2] border-0"
              asChild
            >
              <a
                href="https://calendly.com/drikusbisschoff/al-agency-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call <PhoneCall className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHero;
