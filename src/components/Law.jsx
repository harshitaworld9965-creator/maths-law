import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import "./Law.css";

// Article 14, Constitution of India — split into phrases.
// Phrases with a `note` get highlighted and annotated in the margin.
const CLAUSE = [
  { text: "The State" },
  { text: "shall not", note: "A duty, not a choice. The Article is a limit on the State's power." },
  { text: "deny to" },
  { text: "any person", note: "Not only citizens. Anyone within India's territory is protected, foreign nationals included." },
  { text: "equality before the law", note: "Everyone is equally subject to the ordinary law of the land." },
  { text: "or the" },
  { text: "equal protection of the laws", note: "Like cases are treated alike. Reasonable classification is allowed; arbitrary treatment is not." },
  { text: "within the territory of India." },
];

const NOTED = CLAUSE.filter((p) => p.note);

export default function Law() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: MOTION_OK, small: "(max-width: 800px)" },
        (ctx) => {
          if (!ctx.conditions.motion) return;
          // On small screens the notes sit on top of each other,
          // so only the current one is shown.
          const { small } = ctx.conditions;

          // GSAP: pin the clause, then step through each annotated phrase.
          // The underline grows under the phrase, its note brightens,
          // and the previous note fades back.
          const phrases = gsap.utils.toArray(".law__phrase--noted");
          const notes = gsap.utils.toArray(".law__note");

          gsap.set(phrases, { backgroundSize: "0% 0.12em" });
          gsap.set(notes, { opacity: small ? 0 : 0.15 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".law__reading",
              start: "top top",
              end: `+=${phrases.length * 70}%`,
              pin: true,
              scrub: true,
            },
          });

          phrases.forEach((phrase, i) => {
            tl.to(phrase, { backgroundSize: "100% 0.12em", duration: 1 })
              .to(notes[i], { opacity: 1, duration: 0.6 }, "<");
            if (i > 0) tl.to(notes[i - 1], { opacity: small ? 0 : 0.4, duration: 0.6 }, "<");
          });
          tl.to({}, { duration: 0.6 }); // a short pause before the pin releases
        }
      );
    },
    { scope: root }
  );

  let noteNumber = 0;

  return (
    <section className="law" ref={root} aria-labelledby="law-title">
      <header className="chapter-head">
        <p className="chapter-head__num">Chapter II</p>
        <h2 className="law__title" id="law-title">Law</h2>
      </header>

      <div className="prose law__intro">
        <p>I completed an LL.B. at Maharshi Dayanand University, Rohtak, in 2025.</p>
        <p>
          Law is a discipline of exact language. Here is one sentence from the
          Constitution of India, read slowly.
        </p>
      </div>

      <div className="law__reading">
        <figure className="law__article">
          <figcaption className="law__cite">Article 14 · Equality before law</figcaption>
          <blockquote className="law__clause">
            {CLAUSE.map((p) => {
              if (!p.note) return <span key={p.text}>{p.text} </span>;
              noteNumber += 1;
              return (
                <span key={p.text}>
                  <span className="law__phrase--noted">{p.text}</span>
                  <sup className="law__ref">{noteNumber}</sup>{" "}
                </span>
              );
            })}
          </blockquote>
        </figure>

        <ol className="law__notes">
          {NOTED.map((p) => (
            <li className="law__note" key={p.text}>
              <span className="law__note-term">{p.text}</span>
              {p.note}
            </li>
          ))}
        </ol>
      </div>

      <div className="prose law__outro">
        <p>Every word in that sentence is doing work. Good interface copy should too.</p>
      </div>
    </section>
  );
}
