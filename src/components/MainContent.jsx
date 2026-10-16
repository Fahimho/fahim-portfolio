import HomeSection from "./HomeSection";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Achievements from "./Achievements";
import Projects from "./Projects";
import ExtraCurricular from "./ExtraCurricular";
import Contact from "./Contact";
import Footer from "./Footer";

export default function MainContent({ activeSection }) {
  const sections = {
    about: <HomeSection />,
    education: <Education />,
    experience: <Experience />,
    skills: <Skills />,
    certifications: <Certifications />,
    achievements: <Achievements />,
    projects: <Projects />,
    extracurricular: <ExtraCurricular />,
    contact: <Contact />,
  };

  return (
    <main className="flex-1 p-6 md:p-10 min-h-screen max-w-6xl mx-auto">
      {sections[activeSection] || (
        <div className="theme-card theme-shadow rounded-2xl p-10 min-h-[70vh]
                        flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold theme-heading mb-2">
              Section: <span className="theme-accent">{activeSection}</span>
            </h1>
            <p className="theme-muted text-sm">
              Coming in the next chunk.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}