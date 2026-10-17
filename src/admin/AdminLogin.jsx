import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader } from "lucide-react";
import { useAuth } from "./useAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="theme-card theme-shadow rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        {/* Header */}
        <div className="text-center space-y-2 mb-2">
          <div
            className="w-14 h-14 rounded-full mx-auto flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-soft)" }}
          >
            <Lock size={24} style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="text-2xl font-bold theme-heading">Admin Login</h1>
          <p className="text-xs theme-muted">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium theme-muted mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium theme-muted mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-center" style={{ color: "#ef4444" }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold
                     flex items-center justify-center gap-2
                     transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--text-on-accent)",
          }}
        >
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <Lock size={16} />
              Sign In
            </>
          )}
        </button>

        {/* Back link */}
        <a
          href="/fahim-portfolio/"
          className="block text-center text-xs theme-muted hover:theme-accent transition-colors"
        >
          ← Back to portfolio
        </a>
      </form>
    </div>
  );
}