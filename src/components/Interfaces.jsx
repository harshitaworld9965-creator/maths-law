import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../lib/gsap";
import "./Interfaces.css";

const PROJECTS = [
  { name: "Jelly Creature", about: "Generates a new jelly creature every time.", url: "jelly-creature.vercel.app" },
  { name: "Mercury", about: "Experiments in 3D on the web.", url: "mercury-hazel-seven.vercel.app" },
  { name: "Midnight", about: "A small experiment made for late nights.", url: "harshita-cutesyy.vercel.app" },
  { name: "Ocean Descent", about: "An experiment in scrolling down into depth.", url: "ocean-descent-sigma.vercel.app" },
  { name: "Atmosphere", about: "Plays with temperature through the atmosphere.", url: "atmosphere-umber.vercel.app" },
  { name: "Kaelix Analytics", about: "An analytics interface for Kaelix AI.", url: "kaelix-analytics.vercel.app" },
];

// Where each card starts before it settles into the grid (px and degrees).
const SCATTER = [
  { x: -180, y: 220, rotation: -14 },
  { x: 40, y: 320, rotation: 9 },
  { x: 220, y: 180, rotation: 16 },
  { x: -240, y: 120, rotation: 11 },
  { x: 60, y: 260, rotation: -10 },
  { x: 260, y: 300, rotation: -18 },
];

export default function Interfaces() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // GSAP: the cards start as a messy pile and snap into a tidy grid
        // as you scroll — the page turning into an interface.
        const cards = gsap.utils.toArray(".ui-card");
        cards.forEach((card, i) => {
          gsap.from(card, {
            ...SCATTER[i % SCATTER.length],
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".ui-grid",
              start: "top 95%",
              end: "top 25%",
              scrub: 0.6,
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section className="ui" ref={root} aria-labelledby="ui-title">
      <header className="chapter-head">
        <p className="chapter-head__num">Chapter III</p>
        <h2 className="ui__title" id="ui-title">Interfaces</h2>
      </header>

      <div className="prose ui__intro">
        <p>
          In July 2026 I joined OpenRipples as a frontend developer, building React
          interfaces from design files.
        </p>
        <p>Outside work, I build experiments to learn motion, 3D and interaction. Here are some of them.</p>
      </div>

      <ul className="ui-grid">
        {PROJECTS.map((p) => (
          <li className="ui-card" key={p.url}>
            <div className="ui-card__bar">
              <span className="ui-card__url">{p.url}</span>
            </div>
            <div className="ui-card__body">
              <h3 className="ui-card__name">{p.name}</h3>
              <p className="ui-card__about">{p.about}</p>
              <a className="ui-card__link" href={`https://${p.url}`} target="_blank" rel="noreferrer">
                Open live site
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
