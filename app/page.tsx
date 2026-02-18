import { Scene3D } from '@/components/3d/Scene3D';
import { Navbar } from '@/components/ui/Navbar';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact, Footer } from '@/components/sections/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative grid-bg">
        <Scene3D />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
}
