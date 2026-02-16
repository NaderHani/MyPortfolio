import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import innovaImg from "../assets/innova.png";
import freshcartImg from "../assets/freshcart.png";
import mealifyImg from "../assets/mealify.png";
import danielsImg from "../assets/daniels.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    num: "01",
    title: "Innova Hub",
    description:
      "Smart e-commerce & social platform with AI-driven analytics for real-time insights, enabling small businesses to post products, manage deals, and connect with investors.",
    tags: ["React.js", "Redux", "Tailwind CSS", "REST APIs"],
    badge: "Graduation Project — A+",
    link: "https://github.com/Innovo-hub/Innova-web-client",
    image: innovaImg,
  },
  {
    id: 2,
    num: "02",
    title: "Fresh Cart",
    description:
      "Fully responsive e-commerce app with product listing, search, filters, detailed product views, and shopping cart with clean architecture.",
    tags: ["Angular", "Bootstrap", "TypeScript", "REST APIs"],
    badge: null,
    link: "https://github.com/NaderHani/FreshCart",
    image: freshcartImg,
  },
  {
    id: 3,
    num: "03",
    title: "Mealify",
    description:
      "A restaurant landing page with modern design, smooth animations, and fully responsive layout.",
    tags: ["HTML5", "CSS3"],
    badge: null,
    link: "https://github.com/NaderHani/Mealify",
    image: mealifyImg,
  },
  {
    id: 4,
    num: "04",
    title: "Daniels Portfolio",
    description:
      "A creative personal portfolio template with hero section, social links, and clean responsive layout.",
    tags: ["HTML5", "CSS3"],
    badge: null,
    link: "https://github.com/NaderHani/Portfolio-Lary-Danials",
    image: danielsImg,
  },
];

function ProjectCard({ project, innerRef }) {
  return (
    <a
      ref={innerRef}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      data-hover
    >
      {/* Image */}
      <div
        className="relative w-full rounded-2xl overflow-hidden mb-5"
        style={{ aspectRatio: "16/10" }}
      >
        <div className="project-visual absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md">
            <span className="text-white font-heading text-xs uppercase tracking-wider">
              View on GitHub
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        {/* Number */}
        <span className="absolute top-4 left-5 font-heading text-5xl md:text-6xl font-extrabold text-white/10">
          {project.num}
        </span>

        {/* Badge */}
        {project.badge && (
          <span
            className="absolute top-4 right-4 font-body text-[9px] uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-primary)",
            }}
          >
            {project.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
        {project.title}
      </h3>
      <p className="font-body text-muted text-sm leading-relaxed mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-[10px] uppercase tracking-wider text-muted rounded-full px-2.5 py-0.5"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: (i % 2) * 0.15,
          ease: "power3.out",
        });

        const img = card.querySelector(".project-visual");
        if (img) {
          gsap.to(img, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            yPercent: -6,
            ease: "none",
          });
        }
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
        <div
          ref={headerRef}
          className="flex items-center gap-4 mb-16 md:mb-24"
        >
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

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              innerRef={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
