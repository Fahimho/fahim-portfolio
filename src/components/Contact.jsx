import { useState } from "react";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Facebook } from "lucide-react";
import { useContent } from "../context/ContentContext";
export default function Contact() {
  const { content } = useContent();
  const { personal, socials, contact } = content;
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(contact.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "2px dashed var(--accent)",
            borderLeft: "2px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-2 pt-4">
          <p className="theme-muted text-sm font-medium flex items-center justify-center gap-2">
            <Send size={16} />
            <span>{contact.heading}</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold theme-heading">
            <span className="theme-accent">{contact.headingAccent}</span>
          </h1>
          {contact.description && (
            <p className="theme-body text-sm max-w-xl mx-auto pt-3">
              {contact.description}
            </p>
          )}
        </div>
      </header>

      {/* ============ CONTACT GRID ============ */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: contact info */}
        <div className="space-y-4">
          <InfoCard
            icon={<MapPin size={20} />}
            label="Location"
            value={personal.location}
          />
          <InfoCard
            icon={<Mail size={20} />}
            label="Email"
            value={personal.email}
            href={`mailto:${personal.email}`}
          />
          <InfoCard
            icon={<Phone size={20} />}
            label="Phone"
            value={personal.phone}
            href={`tel:${personal.phone}`}
          />

          <div className="theme-card theme-shadow rounded-2xl p-6">
            <p className="theme-muted text-xs font-medium mb-3 uppercase tracking-wider">
              Find me online
            </p>
            <div className="flex gap-3">
              <SocialBtn href={socials.github} icon={<Github size={18} />} label="GitHub" />
              <SocialBtn href={socials.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialBtn href={socials.facebook} icon={<Facebook size={18} />} label="Facebook" />
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <form
          onSubmit={handleSubmit}
          className="theme-card theme-shadow rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="block text-xs font-medium theme-muted mb-1.5">
              {contact.form.nameLabel}
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none
                         transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium theme-muted mb-1.5">
              {contact.form.emailLabel}
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none
                         transition-colors"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium theme-muted mb-1.5">
              {contact.form.messageLabel}
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none
                         transition-colors resize-none"
              style={{
                backgroundColor: "var(--bg)",
                color: "var(--text-heading)",
                border: "1px solid var(--border)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-2.5 rounded-lg text-sm font-semibold
                       flex items-center justify-center gap-2
                       transition-opacity duration-200 hover:opacity-90
                       disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--text-on-accent)",
            }}
          >
            <Send size={16} />
            {status === "sending" ? "Sending..." : contact.form.submitLabel}
          </button>

          {status === "sent" && (
            <p className="text-xs text-center" style={{ color: "var(--accent)" }}>
              {contact.form.successMessage}
            </p>
          )}

          {status === "error" && (
            <p className="text-xs text-center" style={{ color: "#ef4444" }}>
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, href }) {
  const content = (
    <>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs theme-muted">{label}</p>
        <p className="text-sm font-medium theme-heading truncate">{value}</p>
      </div>
    </>
  );

  const className = `theme-card theme-shadow rounded-2xl p-4 flex items-center gap-4 transition-transform duration-200 ${
    href ? "hover:scale-[1.02] cursor-pointer" : ""
  }`;

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}

function SocialBtn({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-lg flex items-center justify-center
                 transition-all duration-200 hover:scale-110"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-body)",
        border: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
    >
      {icon}
    </a>
  );
}