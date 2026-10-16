import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import LoadingScreen from "./components/LoadingScreen";
import { settings, menuItems } from "./data/content";

export default function App() {
  // ---- Loading screen (once per session) ----
 const [showLoader, setShowLoader] = useState(true);   // ← always plays (for testing)

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "1");
    setShowLoader(false);
  };

  // ---- Active section (from sessionStorage) ----
  const [activeSection, setActiveSection] = useState(() => {
    const saved = sessionStorage.getItem("activeSection");
    const validIds = menuItems.map((m) => m.id);
    if (saved && validIds.includes(saved)) return saved;
    return settings.defaultSection;
  });

  useEffect(() => {
    sessionStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // ---- Scroll persistence ----
  const prevSection = useRef(activeSection);

  useEffect(() => {
    const sectionChanged = prevSection.current !== activeSection;

    if (sectionChanged) {
      window.scrollTo({ top: 0, behavior: "instant" });
      sessionStorage.removeItem("scrollPosition");
      prevSection.current = activeSection;
    } else {
      const savedScroll = sessionStorage.getItem("scrollPosition");
      if (savedScroll && !showLoader) {
        setTimeout(() => {
          window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "instant" });
        }, 50);
      }
    }
  }, [activeSection, showLoader]);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleIntroComplete} />}

      <div
        className="theme-bg min-h-screen flex transition-colors duration-300"
        style={{
          opacity: showLoader ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="ml-[280px] flex-1 transition-all duration-300">
          <MainContent activeSection={activeSection} />
        </div>
      </div>
    </>
  );
}