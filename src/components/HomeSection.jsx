import { MapPin, Mail, Github, Linkedin, User } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function HomeSection() {
  const { content } = useContent();
  const { personal, socials, about } = content;
  const nameParts = personal.name.split(" ");

  return (
    <div className="space-y-10">
      {/* ============ HEADER ============ */}
      <header className="relative theme-card theme-shadow rounded-2xl p-10 overflow-hidden">
        {/* Dotted corner decoration */}
        <div
          className="absolute top-6 left-6 w-16 h-16 pointer-events-none"
          style={{
            borderTop: "3px dashed var(--accent)",
            borderLeft: "3px dashed var(--accent)",
          }}
        />

        <div className="text-center space-y-4 pt-4">
          {/* Greeting with icon + size */}
          <p
            className={`theme-heading font-medium flex items-center justify-center gap-2 ${
              about.greetingSize === "small"
                ? "text-sm"
                : about.greetingSize === "large"
                ? "text-2xl"
                : "text-lg"
            }`}
          >
            {about.greetingIcon && <span>{about.greetingIcon}</span>}
            <span>{about.greeting}</span>
          </p>

          {/* Headline + Name with size */}
          <h1
            className={`font-extrabold leading-tight ${
              about.headlineSize === "small"
                ? "text-2xl md:text-3xl"
                : about.headlineSize === "medium"
                ? "text-3xl md:text-4xl"
                : about.headlineSize === "large"
                ? "text-5xl md:text-6xl"
                : "text-4xl md:text-5xl"
            }`}
          >
            <span className="theme-heading">{about.headline}</span>{" "}
            <span className="theme-accent">{personal.name}!</span>
          </h1>

          {/* Contact row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm theme-body pt-2">
            <ContactItem icon={<MapPin size={16} />} text={personal.location} />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Mail size={16} />}
              text={personal.email}
              href={`mailto:${personal.email}`}
            />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Github size={16} />}
              text="@Fahimho"
              href={socials.github}
            />
            <span className="theme-muted hidden md:inline">•</span>
            <ContactItem
              icon={<Linkedin size={16} />}
              text="LinkedIn"
              href={socials.linkedin}
            />
          </div>
        </div>
      </header>

      {/* ============ ABOUT ============ */}
      <section className="space-y-6">
        <h2 className="section-bar text-2xl font-bold theme-heading">
          About Me
        </h2>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Photo placeholder */}
          <div
  className="aspect-square rounded-2xl overflow-hidden theme-shadow"
  style={{
    border: "2px solid var(--border)",
  }}
>
  {about.photo ? (
    <img
      src={about.photo}
      alt="About"
      className="w-full h-full object-cover object-top"
    />
  ) : (
    <div className="w-full h-full theme-bg-accent-soft
                    flex items-center justify-center">
      <User size={64} className="theme-accent" />
    </div>
  )}
</div>

          {/* Bio paragraphs */}
          <div className="space-y-4 theme-body leading-relaxed">
            {about.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactItem({ icon, text, href }) {
  const content = (
    <span className="flex items-center gap-2 theme-body hover:theme-accent transition-colors">
      {icon}
      <span>{text}</span>
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}