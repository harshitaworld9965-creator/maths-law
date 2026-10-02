import "./Outro.css";

const LINKS = [
  { label: "GitHub", href: "https://github.com/harshitaworld9965-creator" },
  { label: "LinkedIn", href: "https://linkedin.com/in/harshita-deswal-292b44198" },
  { label: "Portfolio", href: "https://harshitaa-portfolio.vercel.app/" },
];

export default function Outro() {
  return (
    <footer className="outro">
      <p className="outro__kicker">Next chapter</p>
      <h2 className="outro__title">Design engineering.</h2>
      <p className="outro__text">
        I'm working toward design engineer roles, where frontend engineering meets
        interaction design and motion.
      </p>
      <ul className="outro__links">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a className="outro__link" href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
