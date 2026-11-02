import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Work } from '../sections/Work';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';
import { Marquee } from '../components/Bits';
import { useReveals } from '../lib/motion';
import { profile } from '../data/profile';

const TICKER = ['React.js', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Django', 'Flask', 'Tailwind CSS', 'REST APIs', 'Flutter', 'Responsive UI', 'Dashboards'];

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  useReveals(ref);

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`;
  }, []);

  // deep links like /#work or /#p-qspot land on their section once, on arrival.
  // (In-page anchor clicks are left to native smooth scrolling.)
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior }), 60);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="main" ref={ref}>
      <Hero />
      <Marquee items={TICKER} />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
