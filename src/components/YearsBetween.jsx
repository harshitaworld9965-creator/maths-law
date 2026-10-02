import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import "./YearsBetween.css";

export default function YearsBetween() {
  const root = useRef(null);
  const year = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // GSAP: pin the section and count the years as you scroll.
        // We tween a plain object's number and write it into the page on every update.
        const counter = { value: 2019 };
        year.current.textContent = "2019";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: true,
          },
        });

        tl.to(counter, {
          value: 2025,
          ease: "none",
          duration: 1,
          onUpdate: () => (year.current.textContent = Math.round(counter.value)),
        })
          .from(".years__track-fill", { scaleX: 0, ease: "none", duration: 1 }, 0)
          .from(".years__later", { opacity: 0, y: 20, duration: 0.2 }, 0.75);

        // Put the static text back if motion gets switched off.
        return () => (year.current.textContent = "2019–2025");
      });
    },
    { scope: root }
  );

  return (
    <section className="years" ref={root} aria-label="2019 to 2025">
      <div className="years__inner">
        <p className="years__counter" ref={year}>2019–2025</p>
        <div className="years__track" aria-hidden="true">
          <span className="years__track-fill" />
        </div>
        <p className="years__text">
          Then six years of full-time preparation for the UPSC and state civil services exams.
        </p>
        <p className="years__text years__later">Somewhere in those years, I studied law.</p>
      </div>
    </section>
  );
}
