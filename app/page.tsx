import Starfield from "@/components/Starfield";
import FlipBook from "@/components/FlipBook";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <div className="nebula-glow fixed inset-0 -z-20" aria-hidden="true" />
      <Starfield />
      <Navbar />
      <FlipBook>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </FlipBook>
    </>
  );
}
