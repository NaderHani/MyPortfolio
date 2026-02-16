import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React.js", category: "core" },
  { name: "JavaScript", category: "core" },
  { name: "TypeScript", category: "core" },
  { name: "HTML5", category: "core" },
  { name: "CSS3", category: "core" },
  { name: "Tailwind CSS", category: "styling" },
  { name: "Bootstrap", category: "styling" },
  { name: "Responsive Design", category: "styling" },
  { name: "Redux", category: "state" },
  { name: "Context API", category: "state" },
  { name: "Axios", category: "state" },
  { name: "REST APIs", category: "state" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Cursor AI", category: "tools" },
  { name: "Claude", category: "tools" },
  { name: "Vite", category: "tools" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Core", value: "core" },
  { label: "Styling", value: "styling" },
  { label: "State & Data", value: "state" },
  { label: "Tools", value: "tools" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const pillsRef = useRef(null);
  const activeFilter = useRef("all");
  const filterBtnsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const pills = pillsRef.current?.querySelectorAll(".skill-pill");
      if (pills) {
        gsap.from(pills, {
          scrollTrigger: { trigger: pillsRef.current, start: "top 88%" },
          scale: 0,
          opacity: 0,
          stagger: { amount: 0.8, from: "random" },
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFilter = (value) => {
    activeFilter.current = value;

    // Update active button style
    filterBtnsRef.current?.querySelectorAll("button").forEach((btn) => {
      if (btn.dataset.filter === value) {
        btn.style.backgroundColor = "var(--color-accent)";
        btn.style.color = "var(--color-primary)";
        btn.style.borderColor = "var(--color-accent)";
      } else {
        btn.style.backgroundColor = "transparent";
        btn.style.color = "var(--color-muted)";
        btn.style.borderColor = "var(--color-border)";
      }
    });

    // Animate pills
    const pills = pillsRef.current?.querySelectorAll(".skill-pill");
    if (!pills) return;

    pills.forEach((pill) => {
      const cat = pill.dataset.category;
      if (value === "all" || cat === value) {
        gsap.to(pill, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(pill, {
          scale: 0.8,
          opacity: 0.15,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">
            03
          </span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: "var(--color-accent)" }} />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">
            Skills & Tools
          </span>
        </div>

        {/* Filter Buttons */}
        <div ref={filterBtnsRef} className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {filters.map((f, i) => (
            <button
              key={f.value}
              data-filter={f.value}
              onClick={() => handleFilter(f.value)}
              className="font-body text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300"
              style={{
                border: "1px solid",
                borderColor: i === 0 ? "var(--color-accent)" : "var(--color-border)",
                backgroundColor: i === 0 ? "var(--color-accent)" : "transparent",
                color: i === 0 ? "var(--color-primary)" : "var(--color-muted)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Skill Pills Cloud */}
        <div
          ref={pillsRef}
          className="flex flex-wrap gap-3 md:gap-4"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              data-category={skill.category}
              className="skill-pill group relative"
            >
              <div
                className="flex items-center gap-2.5 px-6 py-4 md:px-8 md:py-5 rounded-full font-heading text-sm md:text-base font-medium text-foreground transition-all duration-400 hover:text-primary cursor-default overflow-hidden"
                style={{ border: "1px solid var(--color-border)" }}
                data-hover
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-foreground)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
