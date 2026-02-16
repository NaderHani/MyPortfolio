import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    num: "01",
    title: "Innova Hub",
    description:
      "Smart e-commerce & social platform enabling small businesses to post products, manage deals, and connect with investors. Features AI-driven analytics for real-time insights.",
    tags: ["React.js", "Redux", "Context API", "Tailwind CSS", "Axios", "MUI"],
    badge: "Graduation Project — Grade: A+",
    link: "https://github.com/Innovo-hub/Innova-web-client",
  },
  {
    id: 2,
    num: "02",
    title: "Fresh Cart",
    description:
      "Fully responsive e-commerce web application featuring product listing, search, filters, detailed product views, and shopping cart with clean architecture.",
    tags: ["Angular", "Bootstrap", "REST APIs", "HTTPClient"],
    badge: "E-commerce Website",
    link: "https://github.com/NaderHani/FreshCart",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">
            02
          </span>
          <div
            className="w-12 h-[1px]"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">
            Selected Work
          </span>
        </div>

        {/* Project List */}
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <a
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item group block py-10 md:py-14"
              style={{
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Number */}
                <span className="font-heading text-sm text-accent tracking-wider w-12 shrink-0">
                  {project.num}
                </span>

                {/* Title + Badge */}
                <div className="flex-1">
                  <h3 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-accent transition-colors duration-400">
                    {project.title}
                  </h3>
                  {project.badge && (
                    <span
                      className="inline-block mt-3 font-body text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {project.badge}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:w-72 shrink-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-[11px] uppercase tracking-wider text-muted rounded-full px-3 py-1"
                      style={{ border: "1px solid var(--color-border)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div
                  className="hidden md:flex w-12 h-12 rounded-full items-center justify-center shrink-0 transition-all duration-400 group-hover:scale-110"
                  style={{
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <svg
                    className="w-5 h-5 text-foreground group-hover:text-accent transition-all duration-400 -rotate-45 group-hover:rotate-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-muted text-sm md:text-base mt-4 md:ml-20 max-w-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                {project.description}
              </p>
            </a>
          ))}
          {/* Bottom border */}
          <div style={{ borderTop: "1px solid var(--color-border)" }} />
        </div>
      </div>
    </section>
  );
}
