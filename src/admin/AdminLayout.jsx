import { NavLink, useNavigate } from "react-router-dom";
import {
  LogOut, User, FileText, GraduationCap, Briefcase,
  Wrench, Award, Trophy, Folder, Heart, Send, Settings,
} from "lucide-react";
import { useAuth } from "./useAuth";

const MENU = [
  { to: "/admin/dashboard/personal",   label: "Personal Info",    icon: User },
  { to: "/admin/dashboard/about",      label: "About Me",         icon: FileText },
  { to: "/admin/dashboard/education",  label: "Education",        icon: GraduationCap },
  { to: "/admin/dashboard/experience", label: "Experience",       icon: Briefcase },
  { to: "/admin/dashboard/skills",     label: "Skills",           icon: Wrench },
  { to: "/admin/dashboard/certifications", label: "Certifications", icon: Award },
  { to: "/admin/dashboard/achievements",   label: "Achievements",   icon: Trophy },
  { to: "/admin/dashboard/projects",   label: "Projects",         icon: Folder },
  { to: "/admin/dashboard/extracurricular", label: "Extra-Curricular", icon: Heart },
  { to: "/admin/dashboard/contact",    label: "Contact",          icon: Send },
  { to: "/admin/dashboard/settings",   label: "Settings",         icon: Settings },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    // Changed to h-screen and overflow-hidden so the page itself doesn't scroll
    <div
      className="h-screen overflow-hidden flex"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Sidebar - Fixed height, scrolls internally if needed */}
      <aside
        className="w-64 flex-shrink-0 flex flex-col h-full"
        style={{
          backgroundColor: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div className="p-6 border-b flex-shrink-0" style={{ borderColor: "var(--border)" }}>
          <h2 className="font-bold theme-heading text-sm">
            Admin Panel
          </h2>
          <p className="text-xs theme-muted truncate mt-1">
            {user?.email}
          </p>
        </div>

        {/* Menu - Scrollable if it gets too long */}
        <nav className="flex-1 py-2 overflow-y-auto">
          {MENU.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-6 py-2.5 text-xs transition-colors ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "var(--accent)" : "transparent",
                  color: isActive ? "var(--text-on-accent)" : "var(--text-body)",
                })}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors flex-shrink-0"
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--text-body)",
            border: "1px solid var(--border)",
          }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </aside>

      {/* Main Content - This is the only part that scrolls */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}