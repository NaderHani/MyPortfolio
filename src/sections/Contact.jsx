import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Web3Forms — get your free access key at https://web3forms.com/
// Enter your email → check inbox → copy the key below:
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";

const socials = [
  { label: "GitHub", href: "https://github.com/NaderHani" },
  { label: "LinkedIn", href: "https://linkedin.com/in/naderhani2302" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingLines = headingRef.current?.children;
      if (headingLines) {
        gsap.from(Array.from(headingLines).map((div) => div.firstChild), {
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
          yPercent: 100,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        });
      }

      gsap.from(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: "top 85%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(infoRef.current, {
        scrollTrigger: { trigger: infoRef.current, start: "top 88%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_KEY);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding px-6 md:px-12 lg:px-24 pb-16 relative overflow-hidden"
    >
      {/* Background orb */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 pointer-events-none"
        style={{
          width: "clamp(250px, 35vw, 500px)",
          height: "clamp(250px, 35vw, 500px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          opacity: 0.08,
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="font-heading text-sm text-accent tracking-[0.2em] uppercase">05</span>
          <div className="w-12 h-[1px]" style={{ backgroundColor: "var(--color-accent)" }} />
          <span className="font-heading text-sm text-muted tracking-[0.2em] uppercase">Contact</span>
        </div>

        {/* CTA */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="overflow-hidden">
            <h2
              className="font-heading font-bold text-foreground leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              LET&apos;S WORK
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2
              className="font-heading font-bold text-accent leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              TOGETHER
            </h2>
          </div>
        </div>

        {/* Form + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input type="hidden" name="from_name" value="Portfolio Contact Form" />
            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs uppercase tracking-[0.15em] text-muted">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  required
                  placeholder="Your name"
                  className="w-full bg-transparent font-body text-foreground text-base pb-3 outline-none placeholder:text-muted/50 transition-colors duration-300"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--color-accent)")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "var(--color-border)")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs uppercase tracking-[0.15em] text-muted">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-transparent font-body text-foreground text-base pb-3 outline-none placeholder:text-muted/50 transition-colors duration-300"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "var(--color-accent)")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "var(--color-border)")}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs uppercase tracking-[0.15em] text-muted">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                autoComplete="off"
                required
                placeholder="Project idea, collaboration, etc."
                className="w-full bg-transparent font-body text-foreground text-base pb-3 outline-none placeholder:text-muted/50 transition-colors duration-300"
                style={{ borderBottom: "1px solid var(--color-border)" }}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--color-accent)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--color-border)")}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label className="font-body text-xs uppercase tracking-[0.15em] text-muted">
                Message
              </label>
              <textarea
                name="message"
                autoComplete="off"
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent font-body text-foreground text-base pb-3 outline-none resize-none placeholder:text-muted/50 transition-colors duration-300"
                style={{ borderBottom: "1px solid var(--color-border)" }}
                onFocus={(e) => (e.target.style.borderBottomColor = "var(--color-accent)")}
                onBlur={(e) => (e.target.style.borderBottomColor = "var(--color-border)")}
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              {status === "sent" ? (
                <div className="flex items-center gap-3 font-heading text-sm uppercase tracking-wider text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Message sent successfully!
                </div>
              ) : status === "error" ? (
                <div className="flex items-center gap-3 font-heading text-sm uppercase tracking-wider" style={{ color: "#ef4444" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Failed to send. Try again.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-4 font-heading text-sm uppercase tracking-[0.15em] text-foreground transition-colors duration-300 hover:text-accent disabled:opacity-50"
                  data-hover
                >
                  <span className="hover-link">
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </span>
                  <span
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 group-hover:scale-110 group-hover:bg-accent"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    {status === "sending" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="-rotate-45 group-hover:rotate-0 group-hover:text-primary transition-all duration-300"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                </button>
              )}
            </div>
          </form>

          {/* Contact Info Sidebar */}
          <div ref={infoRef} className="flex flex-col gap-8 lg:w-64">
            {/* Email */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mb-2">Email</p>
              <a
                href="mailto:naderhani3030720@gmail.com"
                className="hover-link font-heading text-base font-bold text-foreground"
              >
                naderhani3030720
                <br />
                @gmail.com
              </a>
            </div>

            {/* Phone */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mb-2">Phone</p>
              <a
                href="tel:+201203620019"
                className="hover-link font-body text-base text-foreground"
              >
                +20 120 362 0019
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mb-2">Location</p>
              <p className="font-body text-base text-foreground">Cairo, Egypt</p>
            </div>

            {/* Socials */}
            <div>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted mb-3">Socials</p>
              <div className="flex flex-col gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 font-body text-sm text-foreground hover:text-accent transition-colors duration-300"
                  >
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{ border: "1px solid var(--color-border)" }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
