import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "./useAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen p-6 md:p-10"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="theme-card theme-shadow rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--accent-soft)" }}
            >
              <LayoutDashboard size={22} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <h1 className="text-xl font-bold theme-heading">
                Admin Dashboard
              </h1>
              <p className="text-xs theme-muted">
                Signed in as {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       transition-colors"
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text-body)",
              border: "1px solid var(--border)",
            }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        {/* Placeholder content */}
        <div className="theme-card theme-shadow rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold theme-heading mb-3">
            🎉 Welcome, Fahim!
          </h2>
          <p className="theme-body text-sm mb-4">
            Your admin panel is working. We'll build the editors next.
          </p>
          <p className="theme-muted text-xs">
            Coming up: edit personal info, education, experience, skills, projects, and more.
          </p>
        </div>
      </div>
    </div>
  );
}