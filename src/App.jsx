import { useEffect } from "react";
import { ScrollTrigger } from "./lib/gsap";
import ProgressBar from "./components/ProgressBar";
import Intro from "./components/Intro";
import Mathematics from "./components/Mathematics";
import YearsBetween from "./components/YearsBetween";
import Law from "./components/Law";
import Interfaces from "./components/Interfaces";
import Outro from "./components/Outro";

export default function App() {
  // Web fonts change text sizes after they load, so ScrollTrigger
  // needs to re-measure the page once they're ready.
  useEffect(() => {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <ProgressBar />
      <main>
        <Intro />
        <Mathematics />
        <YearsBetween />
        <Law />
        <Interfaces />
      </main>
      <Outro />
    </>
  );
}
