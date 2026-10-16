import { useEffect, useState } from "react";

export default function RotatingTitle({ titles = [], interval = 2500 }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (titles.length <= 1) return;

    const timer = setInterval(() => {
      // fade out
      setVisible(false);

      // after fade-out (300ms), change the title and fade back in
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [titles, interval]);

  if (!titles.length) return null;

  return (
    <p className="text-center text-xs theme-muted mt-1 leading-snug h-8 overflow-hidden">
      <span
        className={`inline-block transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
        }`}
      >
        {titles[index]}
      </span>
    </p>
  );
}