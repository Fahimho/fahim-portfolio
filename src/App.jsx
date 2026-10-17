import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import LoadingScreen from "./components/LoadingScreen";
import ProjectDetail from "./components/ProjectDetail";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import PersonalEditor from "./admin/editors/PersonalEditor";
import { useAuth } from "./admin/useAuth";
import { useContent } from "./context/ContentContext";
import { menuItems } from "./data/content";
import AboutEditor from "./admin/editors/AboutEditor";
import EducationEditor from "./admin/editors/EducationEditor";
import ExperienceEditor from "./admin/editors/ExperienceEditor";
import SkillsEditor from "./admin/editors/SkillsEditor";
import ProjectsEditor from "./admin/editors/ProjectsEditor";
import CertificationsEditor from "./admin/editors/CertificationsEditor";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <p className="theme-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin" replace />;
  return children;
}

// 1. The Project Layout (Handles the Sidebar + Detail Page)
function ProjectLayout() {
  return (
    <div className="theme-bg min-h-screen flex transition-colors duration-300">
      <Sidebar activeSection="projects" setActiveSection={() => {}} />
      <div className="ml-[280px] flex-1 transition-all duration-300">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <ProjectDetail />
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const { content } = useContent();
  const settings = content.settings || { defaultSection: "about" };
  
  const [showLoader, setShowLoader] = useState(() => {
    return sessionStorage.getItem("introPlayed") !== "1";
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("introPlayed", "1");
    setShowLoader(false);
  };

  const [activeSection, setActiveSection] = useState(() => {
    const saved = sessionStorage.getItem("activeSection");
    const validIds = menuItems.map((m) => m.id);
    if (saved && validIds.includes(saved)) return saved;
    return settings.defaultSection;
  });

  useEffect(() => {
    sessionStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

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
        style={{ opacity: showLoader ? 0 : 1, transition: "opacity 0.5s ease" }}
      >
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="ml-[280px] flex-1 transition-all duration-300">
          <MainContent activeSection={activeSection} />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      
      <Route
        path="/admin/dashboard/*"
        element={
          <RequireAuth>
            <AdminLayout>
              <Routes>
                <Route path="personal" element={<PersonalEditor />} />
                <Route path="about" element={<AboutEditor />} />
                <Route path="education" element={<EducationEditor />} />
                <Route path="experience" element={<ExperienceEditor />} />
                <Route path="skills" element={<SkillsEditor />} />
                <Route path="projects" element={<ProjectsEditor />} />
                <Route path="certifications" element={<CertificationsEditor />} />
                <Route path="*" element={<div className="p-10 text-center theme-heading">Select a section</div>} />
              </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />

      {/* 2. The direct route for the Project Page */}
      <Route path="/projects/:slug" element={<ProjectLayout />} />

      {/* 3. The normal portfolio */}
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}