import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "../assets/profile-image.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const imageRef = useRef(null);
  const textRefs = useRef([]);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip reveal
      gsap.from(imageWrapRef.current, {
        scrollTrigger: { trigger: imageWrapRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
      });

      // Image parallax
      gsap.to(imageRef.current, {
        scrollTrigger: { trigger: imageWrapRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
        yPercent: -15,
        ease: "none",
      });

      // Floating decoration rotation
      gsap.to(decorRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });

      // Text reveals
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addRef = (el) => {
    if (el && !textRefs.current.includes(el)) textRefs.current.push(el);
  };

  return (
    <section ref={sectionRef} id="about" className="section-padding px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] pointer-events-none"
        style={{
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          opacity: 0.06,
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Label */}
        <div ref={addRef} className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">01</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: "var(--color-accent)" }} />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">About</span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image with decorative elements */}
          <div className="relative">
            <div ref={imageWrapRef} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img ref={imageRef} src={profileImage} alt="Nader Hani Ali" className="w-full h-[115%] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, var(--color-primary))", opacity: 0.3 }} />
            </div>

            {/* Floating decoration ring */}
            <div
              ref={decorRef}
              className="absolute -top-6 -right-6 w-28 h-28 md:w-36 md:h-36 pointer-events-none"
              style={{
                border: "1px dashed var(--color-accent)",
                borderRadius: "50%",
                opacity: 0.3,
              }}
            />

            {/* Corner accent */}
            <div
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10"
              style={{ backgroundColor: "var(--color-accent)", opacity: 0.1 }}
            />

            {/* Experience badge floating on image */}
            <div
              ref={addRef}
              className="absolute bottom-6 right-6 px-5 py-3 rounded-xl backdrop-blur-md"
              style={{
                backgroundColor: "var(--color-secondary)",
                border: "1px solid var(--color-border)",
              }}
            >
              <span className="font-heading text-2xl font-bold text-accent">CS</span>
              <p className="font-body text-[10px] text-muted uppercase tracking-wider">Graduate</p>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <h2 ref={addRef} className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Crafting digital
              <br />
              <span className="text-accent">experiences</span> that matter
            </h2>

            <p ref={addRef} className="font-body text-muted text-base md:text-lg leading-relaxed">
              Motivated React Front-End Developer and recent Computer Science graduate from El Shorouk Academy. I specialize in building responsive, interactive SPAs using React.js, modern JavaScript, and best practices.
            </p>

            <p ref={addRef} className="font-body text-muted text-base md:text-lg leading-relaxed">
              Passionate about clean code, performance optimization, and delivering exceptional user experiences. Based in Cairo, Egypt.
            </p>

            {/* Stats Cards */}
            <div ref={addRef} className="grid grid-cols-3 gap-4 mt-4">
              {[
                { value: "A+", label: "Graduation\nProject" },
                { value: "3+", label: "Certificates\nEarned" },
                { value: "2+", label: "Years\nLearning" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="rounded-xl p-4 text-center transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <span className="font-heading text-2xl md:text-3xl font-bold text-accent block">{stat.value}</span>
                  <p className="font-body text-[10px] md:text-xs text-muted mt-1 whitespace-pre-line">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Large Quote */}
        <div ref={addRef} className="mt-24 md:mt-32 relative">
          <span
            className="absolute -top-8 -left-4 font-heading text-[120px] md:text-[180px] font-bold leading-none pointer-events-none select-none"
            style={{ color: "var(--color-accent)", opacity: 0.07 }}
          >
            &ldquo;
          </span>
          <p className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug relative">
            I believe great design is about solving problems with
            <span className="text-accent"> elegance </span>
            and
            <span className="text-accent"> purpose</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
