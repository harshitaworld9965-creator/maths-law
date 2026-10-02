import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import "./Mathematics.css";

// Build the SVG path for y = sin(x), from 0 to 3π, once.
const PLOT = { w: 600, h: 320, left: 40, right: 580, mid: 160, amp: 110 };
const STEPS = 150;
const curvePath = Array.from({ length: STEPS + 1 }, (_, i) => {
  const t = i / STEPS;
  const x = PLOT.left + t * (PLOT.right - PLOT.left);
  const y = PLOT.mid - PLOT.amp * Math.sin(t * 3 * Math.PI);
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
}).join(" ");

const tickX = (n) => PLOT.left + (n / 3) * (PLOT.right - PLOT.left);

const PROOF = [
  "For every ε > 0",
  "there exists δ > 0",
  "such that 0 < |x − a| < δ",
  "implies |f(x) − L| < ε.",
];

export default function Mathematics() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // GSAP: "draw" the sine curve as you scroll.
        // A dashed line whose single dash is as long as the path,
        // pushed out of view with strokeDashoffset, then pulled back to 0.
        const curve = root.current.querySelector(".maths__curve");
        const length = curve.getTotalLength();
        gsap.set(curve, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(curve, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".maths__plot",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        });

        // GSAP: each proof line is "written" left to right with a clip-path.
        gsap.from(".maths__proof-line", {
          clipPath: "inset(0 100% 0 0)",
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: ".maths__proof",
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        });
        gsap.from(".maths__qed", {
          scale: 0,
          ease: "back.out(3)",
          scrollTrigger: { trigger: ".maths__proof", start: "bottom 55%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="maths graph-paper" ref={root} aria-labelledby="maths-title">
      <header className="chapter-head">
        <p className="chapter-head__num">Chapter I</p>
        <h2 className="maths__title" id="maths-title">Mathematics</h2>
      </header>

      <div className="maths__body">
        <div className="prose maths__text">
          <p>
            I studied Mathematics and Computing at Delhi Technological University
            and graduated with a B.Tech in 2019.
          </p>
          <p>
            Mathematics trains one habit above all: break a problem into parts small
            enough to prove, then put them back together.
          </p>
        </div>

        <figure className="maths__plot">
          <svg viewBox={`0 0 ${PLOT.w} ${PLOT.h}`} role="img" aria-label="Graph of y equals sine x from 0 to 3 pi">
            <line className="maths__axis" x1={PLOT.left} y1={PLOT.mid} x2={PLOT.right + 10} y2={PLOT.mid} />
            <line className="maths__axis" x1={PLOT.left} y1="20" x2={PLOT.left} y2={PLOT.h - 20} />
            {[1, 2, 3].map((n) => (
              <g key={n}>
                <line className="maths__axis" x1={tickX(n)} y1={PLOT.mid - 6} x2={tickX(n)} y2={PLOT.mid + 6} />
                <text className="maths__tick" x={tickX(n)} y={PLOT.mid + 30}>
                  {n === 1 ? "π" : `${n}π`}
                </text>
              </g>
            ))}
            <path className="maths__curve" d={curvePath} />
          </svg>
          <figcaption className="maths__caption">
            <i>y</i> = sin <i>x</i>
          </figcaption>
        </figure>
      </div>

      <div className="maths__proof">
        <p className="maths__proof-label">The definition of a limit, the first proof most of us learn to fear:</p>
        <div className="maths__proof-lines">
          {PROOF.map((line) => (
            <p className="maths__proof-line" key={line}>{line}</p>
          ))}
          <span className="maths__qed" aria-hidden="true">∎</span>
        </div>
      </div>
    </section>
  );
}
