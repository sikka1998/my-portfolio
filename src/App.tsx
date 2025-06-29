import { useRef } from "react";
import "./App.css";
import AnimatedTabs from "./components/AnimatedTabs";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import EducationExperienceSection from "./components/EducationExperienceSection";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const eduexpRefs = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="max-w-[1280px] mx-auto px-4 text-center">
        <Toaster position="top-right" />
        <AnimatedTabs
          refs={{
            About: aboutRef,
            Skills: skillsRef,
            Experience: eduexpRefs,
            Contact: contactRef,
          }}
        />
        <div ref={aboutRef}>
          <Header />
          <Hero />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={eduexpRefs}>
          <EducationExperienceSection />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
