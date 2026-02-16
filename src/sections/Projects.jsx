import { useEffect, useRef, useCallback, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Innova Hub",
    category: "Web Platform",
    description: "Smart e-commerce & social platform with AI-driven analytics, enabling businesses to manage products, deals, and connect with investors.",
    tags: ["React.js", "Redux", "Tailwind CSS", "REST APIs"],
    badge: "Graduation Project — A+",
    link: "https://github.com/Innovo-hub/Innova-web-client",
    year: "2024",
  },
  {
    id: 2,
    num: "02",
    title: "Fresh Cart",
    category: "E-Commerce",
    description: "Fully responsive e-commerce app with product listing, search, filters, and shopping cart with clean architecture.",
    tags: ["Angular", "Bootstrap", "TypeScript", "REST APIs"],
    badge: null,
    link: "https://github.com/NaderHani/FreshCart",
    year: "2024",
  },
  {
    id: 3,
    num: "03",
    title: "Mealify",
    category: "Landing Page",
    description: "A restaurant landing page with modern design, smooth animations, and fully responsive layout.",
    tags: ["HTML5", "CSS3"],
    badge: null,
    link: "https://github.com/NaderHani/Mealify",
    year: "2024",
  },
  {
    id: 4,
    num: "04",
    title: "Daniels Portfolio",
    category: "Portfolio",
    description: "A creative personal portfolio template with hero section, social links, and clean responsive layout.",
    tags: ["HTML5", "CSS3"],
    badge: null,
    link: "https://github.com/NaderHani/Portfolio-Lary-Danials",
    year: "2024",
  },
];

const ProjectRow = memo(function ProjectRow({ project, innerRef }) {
  return (
    <a
      ref={innerRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
      data-hover
    >
      {/* Top border line */}
      <div className="h-[1px] w-full" style={{ backgroundColor: "var(--color-border)" }} />

      <div className="py-8 md:py-10 lg:py-12 transition-all duration-500">
        {/* Main row */}
        <div className="flex items-start md:items-center justify-between gap-4 md:gap-8">
          {/* Left: Number + Title */}
          <div className="flex items-start md:items-center gap-4 md:gap-8 flex-1 min-w-0">
            {/* Number */}
            <span className="font-heading text-xs md:text-sm text-muted tracking-wider shrink-0 pt-1 md:pt-0 transition-colors duration-300 group-hover:text-accent">
              {project.num}
            </span>

            {/* Title + Category */}
            <div className="min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h3
                  className="font-heading font-bold text-foreground transition-all duration-500 group-hover:text-accent group-hover:translate-x-2"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}
                >
                  {project.title}
                </h3>
                {project.badge && (
                  <span
                    className="font-body text-[9px] uppercase tracking-wider px-3 py-1 rounded-full shrink-0 hidden sm:inline-block"
                    style={{ backgroundColor: "var(--color-accent)", color: "var(--color-primary)" }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>
              <span className="font-body text-xs md:text-sm text-muted uppercase tracking-[0.15em] mt-1 block transition-all duration-500 group-hover:translate-x-2">
                {project.category}
              </span>
            </div>
          </div>

          {/* Right: Year + Arrow */}
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <span className="font-body text-xs text-muted hidden md:block">
              {project.year}
            </span>

            {/* Arrow circle */}
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-muted -rotate-45 transition-all duration-500 group-hover:rotate-0 group-hover:text-accent"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description + Tags — revealed on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div className="pt-5 md:pt-6 pl-0 md:pl-16 lg:pl-20 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8">
            <p className="font-body text-muted text-sm leading-relaxed max-w-md">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[10px] uppercase tracking-wider text-muted rounded-full px-2.5 py-0.5 whitespace-nowrap"
                  style={{ border: "1px solid var(--color-border)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const setCardRef = useCallback((el, i) => {
    cardsRef.current[i] = el;
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
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
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">02</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: "var(--color-accent)" }} />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">Selected Work</span>
        </div>

        {/* Project List */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              innerRef={(el) => setCardRef(el, i)}
            />
          ))}
          {/* Bottom border */}
          <div className="h-[1px] w-full" style={{ backgroundColor: "var(--color-border)" }} />
        </div>
      </div>
    </section>
  );
}
