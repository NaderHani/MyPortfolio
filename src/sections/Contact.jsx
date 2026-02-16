import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: "GitHub", href: "https://github.com/NaderHani" },
  { label: "LinkedIn", href: "https://linkedin.com/in/naderhani2302" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingLines = headingRef.current?.children;
      if (headingLines) {
        gsap.from(Array.from(headingLines).map((div) => div.firstChild), {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
          yPercent: 100,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        });
      }

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 88%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding px-6 md:px-12 lg:px-24 pb-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">
            05
          </span>
          <div
            className="w-12 h-[1px]"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">
            Contact
          </span>
        </div>

        {/* CTA Heading */}
        <div ref={headingRef}>
          <div className="overflow-hidden">
            <h2
              className="font-heading font-bold text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              LET&apos;S WORK
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="font-heading font-bold text-accent leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
            >
              TOGETHER
            </h2>
          </div>
        </div>

        {/* Contact Info */}
        <div
          ref={contentRef}
          className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end md:justify-between gap-12"
        >
          <div className="flex flex-col gap-5">
            <p className="font-body text-muted text-lg">
              Got a project in mind? Let&apos;s talk.
            </p>
            <a
              href="mailto:naderhani3030720@gmail.com"
              className="hover-link font-heading text-xl md:text-3xl font-bold text-foreground inline-block"
            >
              naderhani3030720@gmail.com
            </a>
            <a
              href="tel:+201203620019"
              className="hover-link font-body text-lg text-muted hover:text-foreground transition-colors duration-300 inline-block"
            >
              +20 120 362 0019
            </a>
            <p className="font-body text-sm text-muted flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Cairo, Egypt
            </p>
          </div>

          <div className="flex gap-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-link font-body text-sm uppercase tracking-[0.15em] text-muted hover:text-foreground transition-colors duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
