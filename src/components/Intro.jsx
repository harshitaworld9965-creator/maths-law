import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import "./Intro.css";

export default function Intro() {
  const root = useRef(null);

  // GSAP: one page-load sequence. Each word rises out of its mask,
  // the arrows stretch between them, then the small text fades in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".intro__word", { yPercent: 115, duration: 1.1, stagger: 0.3 })
          .from(".intro__arrow", { scaleX: 0, duration: 0.7, stagger: 0.3 }, 0.45)
          .from(".intro__meta", { opacity: 0, y: 12, duration: 0.8 }, "-=0.3");
      });
    },
    { scope: root }
  );

  return (
    <section className="intro graph-paper" ref={root}>
      <h1 className="intro__title">
        <span className="intro__mask">
          <span className="intro__word intro__word--maths">Maths</span>
        </span>
        <span className="intro__arrow" aria-hidden="true" />
        <span className="intro__mask">
          <span className="intro__word intro__word--law">Law</span>
        </span>
        <span className="intro__arrow" aria-hidden="true" />
        <span className="intro__mask">
          <span className="intro__word intro__word--ui">Interfaces</span>
        </span>
      </h1>

      <div className="intro__meta">
        <p className="intro__lede">How I got to frontend engineering, in three chapters.</p>
        <p className="intro__byline">Harshita</p>
      </div>
    </section>
  );
}
