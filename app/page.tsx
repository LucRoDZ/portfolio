import { Scene3D } from '@/components/3d/Scene3D';
import { Navbar } from '@/components/ui/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="relative">
      <Scene3D />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
