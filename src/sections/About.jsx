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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageWrapRef.current, {
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: -15,
        ease: "none",
      });

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
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
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div ref={addRef} className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">
            01
          </span>
          <div
            className="w-12 h-[1px]"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">
            About
          </span>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageWrapRef}
            className="relative aspect-[4/5] overflow-hidden rounded-lg"
          >
            <img
              ref={imageRef}
              src={profileImage}
              alt="Nader Hani Ali"
              className="w-full h-[115%] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "var(--color-accent)", opacity: 0.08 }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <h2
              ref={addRef}
              className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight"
            >
              Crafting digital
              <br />
              <span className="text-accent">experiences</span> that matter
            </h2>

            <p
              ref={addRef}
              className="font-body text-muted text-base md:text-lg leading-relaxed"
            >
              Motivated React Front-End Developer and recent Computer Science
              graduate from El Shorouk Academy. I specialize in building
              responsive, interactive SPAs using React.js, modern JavaScript,
              and best practices.
            </p>

            <p
              ref={addRef}
              className="font-body text-muted text-base md:text-lg leading-relaxed"
            >
              Passionate about clean code, performance optimization, and
              delivering exceptional user experiences. Based in Cairo, Egypt.
            </p>

            {/* Stats */}
            <div
              ref={addRef}
              className="grid grid-cols-3 gap-6 mt-6 pt-6"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <div>
                <span className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  CS
                </span>
                <p className="font-body text-xs md:text-sm text-muted mt-1">
                  Bachelor&apos;s
                  <br />
                  Degree
                </p>
              </div>
              <div>
                <span className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  A+
                </span>
                <p className="font-body text-xs md:text-sm text-muted mt-1">
                  Graduation
                  <br />
                  Project
                </p>
              </div>
              <div>
                <span className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                  3+
                </span>
                <p className="font-body text-xs md:text-sm text-muted mt-1">
                  Certificates
                  <br />
                  Earned
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Large Quote */}
        <div ref={addRef} className="mt-24 md:mt-32">
          <p className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground leading-snug">
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
