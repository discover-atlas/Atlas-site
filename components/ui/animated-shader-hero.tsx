"use client";

import React, { useRef, useEffect } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";

/* ─────────────────────────────────────────────────
   GLSL Shader source (cloud / nebula — warm oranges
   that match the Atlas Leads brand palette)
───────────────────────────────────────────────── */
const DEFAULT_SHADER = `#version 300 es
/*
 * made by Matthias Hurrle (@atzedent)
 */
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}
  return t;
}
float clouds(vec2 p){
  float d=1.,t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);d=a;p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

/* ─────────────────────────────────────────────────
   Types
───────────────────────────────────────────────── */
interface ButtonConfig {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface HeroProps {
  trustBadge?: { text: string; icon?: string };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: { primary?: ButtonConfig; secondary?: ButtonConfig };
  className?: string;
}

/* ─────────────────────────────────────────────────
   WebGL Renderer
───────────────────────────────────────────────── */
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private shaderSource: string;
  private mouseMove = [0, 0];
  private mouseCoords = [0, 0];
  private pointerCoords = [0, 0];
  private nbrOfPointers = 0;

  private readonly vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2")!;
    this.shaderSource = DEFAULT_SHADER;
  }

  updateMove(deltas: number[]) { this.mouseMove = deltas; }
  updateMouse(coords: number[]) { this.mouseCoords = coords; }
  updatePointerCoords(coords: number[]) { this.pointerCoords = coords; }
  updatePointerCount(nbr: number) { this.nbrOfPointers = nbr; }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  private compile(shader: WebGLShader, source: string) {
    const { gl } = this;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    }
  }

  test(source: string): string | null {
    const { gl } = this;
    const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const result = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
      ? null
      : gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    return result;
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (program && !gl.getProgramParameter(program, gl.DELETE_STATUS)) {
      if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
      if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
      gl.deleteProgram(program);
    }
  }

  setup() {
    const { gl } = this;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, this.shaderSource);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    (program as any).resolution   = gl.getUniformLocation(program, "resolution");
    (program as any).time         = gl.getUniformLocation(program, "time");
    (program as any).move         = gl.getUniformLocation(program, "move");
    (program as any).touch        = gl.getUniformLocation(program, "touch");
    (program as any).pointerCount = gl.getUniformLocation(program, "pointerCount");
    (program as any).pointers     = gl.getUniformLocation(program, "pointers");
  }

  render(now = 0) {
    const { gl, program, canvas } = this;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f((program as any).resolution, canvas.width, canvas.height);
    gl.uniform1f((program as any).time, now * 1e-3);
    gl.uniform2f((program as any).move, this.mouseMove[0], this.mouseMove[1]);
    gl.uniform2f((program as any).touch, this.mouseCoords[0], this.mouseCoords[1]);
    gl.uniform1i((program as any).pointerCount, this.nbrOfPointers);
    gl.uniform2fv((program as any).pointers, this.pointerCoords);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

/* ─────────────────────────────────────────────────
   Pointer Handler
───────────────────────────────────────────────── */
class PointerHandler {
  private scale: number;
  private active = false;
  private pointers = new Map<number, number[]>();
  private lastCoords = [0, 0];
  private moves = [0, 0];

  constructor(element: HTMLCanvasElement, scale: number) {
    this.scale = scale;

    const map = (el: HTMLCanvasElement, s: number, x: number, y: number) =>
      [x * s, el.height - y * s];

    element.addEventListener("pointerdown", (e) => {
      this.active = true;
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
    });

    element.addEventListener("pointerup", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointerleave", (e) => {
      if (this.count === 1) this.lastCoords = this.first;
      this.pointers.delete(e.pointerId);
      this.active = this.pointers.size > 0;
    });

    element.addEventListener("pointermove", (e) => {
      if (!this.active) return;
      this.lastCoords = [e.clientX, e.clientY];
      this.pointers.set(e.pointerId, map(element, this.scale, e.clientX, e.clientY));
      this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
    });
  }

  updateScale(s: number) { this.scale = s; }

  get count() { return this.pointers.size; }
  get move()  { return this.moves; }
  get coords(): number[] {
    return this.pointers.size > 0
      ? Array.from(this.pointers.values()).flat()
      : [0, 0];
  }
  get first(): number[] {
    const val = this.pointers.values().next().value;
    return val ?? this.lastCoords;
  }
}

/* ─────────────────────────────────────────────────
   Hook
───────────────────────────────────────────────── */
function useShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | undefined>(undefined);
  const renderer  = useRef<WebGLRenderer | null>(null);
  const handler   = useRef<PointerHandler | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const resize = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      renderer.current?.updateScale(dpr);
      handler.current?.updateScale(dpr);
    };

    const loop = (now: number) => {
      if (!renderer.current || !handler.current) return;
      renderer.current.updateMouse(handler.current.first);
      renderer.current.updatePointerCount(handler.current.count);
      renderer.current.updatePointerCoords(handler.current.coords);
      renderer.current.updateMove(handler.current.move);
      renderer.current.render(now);
      rafRef.current = requestAnimationFrame(loop);
    };

    renderer.current = new WebGLRenderer(canvas, dpr);
    handler.current  = new PointerHandler(canvas, dpr);

    renderer.current.setup();
    renderer.current.init();
    resize();

    if (renderer.current.test(DEFAULT_SHADER) === null) {
      renderer.current.setup();
      renderer.current.init();
    }

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.current?.reset();
    };
  }, []);

  return canvasRef;
}

/* ─────────────────────────────────────────────────
   Hero component
───────────────────────────────────────────────── */
function CTAButton({ btn, primary }: { btn: ButtonConfig; primary: boolean }) {
  const base =
    "inline-flex items-center gap-3 rounded-full font-medium tracking-wide transition-all duration-300";
  const classes = primary
    ? `${base} px-9 py-4 text-[13px] border border-white/25 bg-white/8 backdrop-blur-sm text-white hover:bg-white hover:text-[#0a0a0a] hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.12)]`
    : `${base} px-9 py-4 text-[13px] border border-white/10 bg-transparent text-white/50 hover:text-white hover:border-white/25`;

  if (btn.href) {
    return (
      <a href={btn.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {primary && <PhoneCall className="w-[14px] h-[14px] shrink-0" />}
        {btn.text}
        <ArrowRight className="w-[14px] h-[14px] shrink-0" />
      </a>
    );
  }
  return (
    <button onClick={btn.onClick} className={classes}>
      {primary && <PhoneCall className="w-[14px] h-[14px] shrink-0" />}
      {btn.text}
      <ArrowRight className="w-[14px] h-[14px] shrink-0" />
    </button>
  );
}

const Hero: React.FC<HeroProps> = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className = "",
}) => {
  const canvasRef = useShaderBackground();

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-[#0a0a0a] ${className}`}>
      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes al-fade-down {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes al-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .al-fade-down { animation: al-fade-down 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .al-fade-up   { animation: al-fade-up   0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
        .al-d1 { animation-delay: 0.15s; }
        .al-d2 { animation-delay: 0.3s;  }
        .al-d3 { animation-delay: 0.48s; }
        .al-d4 { animation-delay: 0.65s; }
      `}</style>

      {/* WebGL canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{ background: "#0a0a0a" }}
      />

      {/* Edge vignette for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(10,10,10,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10,10,10,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-5xl mx-auto w-full flex flex-col items-center gap-0">

          {/* Trust badge */}
          {trustBadge && (
            <div className="al-fade-down mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00C9C8]/25 bg-[#00C9C8]/8 backdrop-blur-sm px-5 py-2.5 text-[10px] tracking-[0.28em] uppercase text-[#00C9C8] font-medium">
                {trustBadge.icon && (
                  <span aria-hidden="true">{trustBadge.icon}</span>
                )}
                {trustBadge.text}
              </span>
            </div>
          )}

          {/* Headline */}
          <div className="overflow-hidden mb-1">
            <h1
              className="al-fade-up al-d1 font-display text-[#f0ede8] leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 9vw, 9.5rem)" }}
            >
              {headline.line1}
            </h1>
          </div>
          <div className="overflow-hidden mb-10">
            <h1
              className="al-fade-up al-d2 font-display text-[#f0ede8]/18 leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 9vw, 9.5rem)" }}
            >
              {headline.line2}
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="al-fade-up al-d3 text-base md:text-lg text-[#f0ede8]/35 font-light leading-relaxed max-w-[40ch] mb-12"
          >
            {subtitle}
          </p>

          {/* Buttons */}
          {buttons && (buttons.primary || buttons.secondary) && (
            <div className="al-fade-up al-d4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {buttons.primary  && <CTAButton btn={buttons.primary}  primary={true}  />}
              {buttons.secondary && <CTAButton btn={buttons.secondary} primary={false} />}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#f0ede8] font-medium">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#f0ede8]/60 to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
