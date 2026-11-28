"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * The tiny live visuals inside the larger Tech Stack cards. Each one only animates while it is on
 * screen (SMIL is paused / intervals are cleared otherwise) and stays still under reduced motion.
 */

function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  const reduced = useReducedMotion();
  return { ref, live: inView && !reduced, reduced: Boolean(reduced) };
}

/** Pause or resume every SMIL animation in an <svg> alongside the live flag. */
function useSmil(svg: React.RefObject<SVGSVGElement | null>, live: boolean) {
  useEffect(() => {
    const el = svg.current;
    if (!el || typeof el.pauseAnimations !== "function") return;
    if (live) el.unpauseAnimations();
    else el.pauseAnimations();
  }, [svg, live]);
}

/* ------------------------------------------------------------------ agents */

type Node = { id: string; x: number; y: number; label: string; hub?: boolean };

const nodes: Node[] = [
  { id: "task", x: 44, y: 85, label: "task" },
  { id: "plan", x: 150, y: 32, label: "plan" },
  { id: "mcp", x: 150, y: 138, label: "MCP" },
  { id: "hub", x: 240, y: 85, label: "orchestrator", hub: true },
  { id: "code", x: 330, y: 32, label: "code" },
  { id: "review", x: 330, y: 138, label: "review" },
  { id: "done", x: 436, y: 85, label: "done" },
];

/** [from, to, stage]: a message hops stage by stage, one pulse per edge per cycle. */
const edges: [string, string, number][] = [
  ["task", "plan", 0],
  ["task", "mcp", 0],
  ["plan", "hub", 1],
  ["mcp", "hub", 1],
  ["hub", "code", 2],
  ["hub", "review", 2],
  ["code", "done", 3],
  ["review", "done", 3],
];

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
const CYCLE = 4.8;

export function AgentsVisual() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const svg = useRef<SVGSVGElement>(null);
  useSmil(svg, live);

  return (
    <div ref={ref} className="stack-visual min-h-0 w-full flex-1" aria-hidden="true">
      <svg ref={svg} viewBox="12 6 456 158" className="h-full max-h-[220px] w-full" role="presentation">
        {edges.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={byId[a].x}
            y1={byId[a].y}
            x2={byId[b].x}
            y2={byId[b].y}
            stroke="currentColor"
            strokeOpacity="0.16"
            strokeWidth="1.2"
            strokeDasharray="3 4"
          />
        ))}

        {!reduced &&
          edges.map(([a, b, stage]) => {
            const A = byId[a];
            const B = byId[b];
            const begin = `${(stage * 0.9).toFixed(2)}s`;
            return (
              <circle key={`p-${a}-${b}`} r="3.2" fill="var(--accent)" opacity="0">
                <animateMotion
                  dur={`${CYCLE}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  path={`M ${A.x} ${A.y} L ${B.x} ${B.y}`}
                  keyPoints="0;1;1"
                  keyTimes="0;0.16;1"
                  calcMode="linear"
                />
                <animate
                  attributeName="opacity"
                  dur={`${CYCLE}s`}
                  begin={begin}
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                  keyTimes="0;0.02;0.14;0.17;1"
                />
              </circle>
            );
          })}

        {nodes.map((n) => (
          <g key={n.id}>
            {n.hub && !reduced && (
              <circle cx={n.x} cy={n.y} r="18" fill="none" stroke="var(--accent)" strokeWidth="1.4">
                <animate attributeName="r" values="18;30;30" keyTimes="0;0.5;1" dur={`${CYCLE / 2}s`} begin="1.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0" keyTimes="0;0.5;1" dur={`${CYCLE / 2}s`} begin="1.4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={n.x}
              cy={n.y}
              r={n.hub ? 19 : 10}
              fill={n.hub ? "currentColor" : "var(--stack-card)"}
              stroke="currentColor"
              strokeWidth="1.3"
            />
            {n.hub ? (
              <circle cx={n.x} cy={n.y} r="5" fill="var(--accent)" />
            ) : (
              <circle cx={n.x} cy={n.y} r="2.6" fill="currentColor" />
            )}
            <text
              x={n.x}
              y={n.y + (n.hub ? 36 : 25)}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              fillOpacity="0.55"
              letterSpacing="0.02em"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- pipeline */

export function PipelineVisual() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const svg = useRef<SVGSVGElement>(null);
  useSmil(svg, live);
  const lane = "M 14 38 L 218 38";

  return (
    <div ref={ref} className="stack-visual w-full" aria-hidden="true">
      <svg ref={svg} viewBox="0 0 232 96" className="h-auto w-full" role="presentation">
        <path d={lane} stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.2" strokeDasharray="3 4" fill="none" />
        {!reduced &&
          [0, 1, 2, 3].map((i) => (
            <circle key={i} r="3.2" fill="var(--accent)" opacity="0">
              <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={lane} calcMode="linear" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.06;0.9;1" dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          ))}
        {[
          { x: 4, label: "API" },
          { x: 90, label: "queue" },
          { x: 176, label: "worker" },
        ].map((s) => (
          <g key={s.label}>
            <rect x={s.x} y="20" width="52" height="36" rx="9" fill="var(--stack-card)" stroke="currentColor" strokeWidth="1.3" />
            <text x={s.x + 26} y="42.5" textAnchor="middle" fontSize="10.5" fill="currentColor">
              {s.label}
            </text>
          </g>
        ))}
        {/* worker pool: three bars that fill in turn */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={176 + i * 19} y="68" width="14" height="5" rx="2.5" fill="currentColor" fillOpacity="0.12" />
            {!reduced && (
              <rect x={176 + i * 19} y="68" width="0" height="5" rx="2.5" fill="var(--accent)">
                <animate attributeName="width" values="0;14;14;0;0" keyTimes="0;0.2;0.55;0.6;1" dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              </rect>
            )}
          </g>
        ))}
        <text x="4" y="86" fontSize="9.5" fill="currentColor" fillOpacity="0.5">
          jobs in, results out
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------- code */

const SNIPPET = `const Hero = () => (
  <h1 className="text-accent">
    Hi, I’m Faizan.
  </h1>
);`;

const TOKEN = /(\bconst\b|"[^"]*"|<\/?h1|=>)/g;

function highlight(text: string) {
  return text.split(TOKEN).map((part, i) => {
    if (!part) return null;
    const hot = i % 2 === 1;
    return (
      <span key={i} className={hot ? "text-accent" : undefined}>
        {part}
      </span>
    );
  });
}

export function CodeVisual() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const [count, setCount] = useState(reduced ? SNIPPET.length : 0);

  useEffect(() => {
    if (reduced) {
      setCount(SNIPPET.length);
      return;
    }
    if (!live) return;
    let n = 0;
    let hold = 0;
    const id = window.setInterval(() => {
      if (hold > 0) {
        hold -= 1;
        if (hold === 0) n = 0;
        else return;
      }
      n += 1;
      if (n >= SNIPPET.length) {
        n = SNIPPET.length;
        hold = 42; // ~2.5s pause on the finished snippet
      }
      setCount(n);
    }, 60);
    return () => window.clearInterval(id);
  }, [live, reduced]);

  return (
    <div
      ref={ref}
      className="stack-code relative min-w-0 rounded-[12px] border border-ink/10 bg-cream/70 overflow-hidden px-3.5 py-3 font-mono text-[11.5px] leading-[1.65] text-ink/75"
      aria-hidden="true"
    >
      <span className="mb-2 flex gap-1.5">
        <i className="h-2 w-2 rounded-full bg-ink/15" />
        <i className="h-2 w-2 rounded-full bg-ink/15" />
        <i className="h-2 w-2 rounded-full bg-ink/15" />
      </span>
      <div className="relative">
        <pre className="invisible m-0 whitespace-pre font-[inherit]">{SNIPPET}</pre>
        <pre className="absolute inset-0 m-0 whitespace-pre font-[inherit]">
          {highlight(SNIPPET.slice(0, count))}
          {!reduced && <span className="stack-caret" />}
        </pre>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- rows */

const rowWidths = [78, 54, 66, 40];

export function RowsVisual() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-active={live ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      className="stack-visual stack-rows flex min-w-0 flex-col gap-2 rounded-[12px] border border-ink/10 bg-cream/70 p-3"
      aria-hidden="true"
    >
      {rowWidths.map((w, i) => (
        <div key={i} className="stack-row relative flex items-center gap-3 rounded-[8px] px-2 py-1.5" style={{ animationDelay: `${i * 0.85}s` }}>
          <span className="stack-row-dot h-2 w-2 shrink-0 rounded-full bg-ink/20" style={{ animationDelay: `${i * 0.85}s` }} />
          <span className="h-1.5 rounded-full bg-ink/15" style={{ width: `${w}%` }} />
          <span className="ml-auto h-1.5 w-8 rounded-full bg-ink/10" />
        </div>
      ))}
    </div>
  );
}
