import { useRef } from 'react';
import './App.css'
import AnimatedTabs from './components/AnimatedTabs'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

   return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Toaster position='top-right' />
        <AnimatedTabs
          refs={{
            About: aboutRef,
            Skills: skillsRef,
            Projects: projectsRef,
            Contact: contactRef
          }}
        />
        <div ref={aboutRef}><Header /><Hero /></div>
        <div ref={skillsRef}><Skills /></div>
        <div ref={projectsRef}><Projects /></div>
        <div ref={contactRef}><Contact /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App
