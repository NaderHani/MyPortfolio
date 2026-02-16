import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const education = {
  degree: "Bachelor's Degree, Computer Science",
  school: "El Shorouk Academy",
  period: "Sep 2021 — Jun 2025",
  highlight: "A+ in Graduation Project (Innova Hub)",
};

const certificates = [
  "ITI — Summer Course Front-End Development",
  "Route Academy — Front-End Development",
  "IBM — Work with Agility",
];

const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Fluent" },
];

export default function Resume() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addRef = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="section-padding px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">
            04
          </span>
          <div
            className="w-12 h-[1px]"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">
            Resume
          </span>
        </div>

        {/* Download Button - Prominent */}
        <div ref={addRef} className="mb-16 md:mb-20">
          <a
            href="/Nader-Hani-Ali-Resume.pdf"
            download="Nader Hani Ali - Resume.pdf"
            className="group inline-flex items-center gap-4 px-8 py-5 rounded-full font-heading font-bold text-lg md:text-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            {/* Download Icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-1 transition-transform duration-300"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Resume Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Education */}
          <div ref={addRef}>
            <h3
              className="font-heading text-xs uppercase tracking-[0.3em] text-accent mb-8 pb-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              Education
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                <h4 className="font-heading text-lg md:text-xl font-bold text-foreground">
                  {education.degree}
                </h4>
                <span className="font-body text-sm text-muted whitespace-nowrap">
                  {education.period}
                </span>
              </div>
              <p className="font-body text-muted">{education.school}</p>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <span className="font-body text-sm text-foreground font-medium">
                  {education.highlight}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Certificates */}
          <div ref={addRef}>
            <h3
              className="font-heading text-xs uppercase tracking-[0.3em] text-accent mb-8 pb-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              Certificates
            </h3>
            <div className="flex flex-col gap-4">
              {certificates.map((cert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="font-heading text-sm text-accent mt-[2px] shrink-0"
                  >
                    0{i + 1}
                  </span>
                  <p className="font-body text-foreground text-base">
                    {cert}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages Row */}
        <div
          ref={addRef}
          className="mt-12 md:mt-16 pt-12"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h3 className="font-heading text-xs uppercase tracking-[0.3em] text-accent mb-8">
            Languages
          </h3>
          <div className="flex flex-wrap gap-6">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-3 px-5 py-3 rounded-full"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <span className="font-heading text-base font-bold text-foreground">
                  {lang.name}
                </span>
                <span className="font-body text-sm text-muted">
                  — {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
