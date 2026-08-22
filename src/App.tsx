import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { FloatingThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <div className="w-full min-h-screen bg-ink text-fg-2 selection:bg-fg-3 selection:text-ink">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ResearchSection />
      <ExperienceSection />
      <ContactSection />
      <FloatingThemeToggle />
    </div>
  );
}

export default App;