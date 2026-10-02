import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import "./ProgressBar.css";

export default function ProgressBar() {
  const bar = useRef(null);

  // GSAP: the bar's width follows how far you've scrolled through the page.
  useGSAP(() => {
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  return <div className="progress" ref={bar} aria-hidden="true" />;
}
