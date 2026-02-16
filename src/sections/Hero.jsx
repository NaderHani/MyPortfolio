import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef(null);
  const topLineRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const circleRef = useRef(null);
  const orbRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.5 });

      // Grid fade in
      tl.from(gridRef.current, { opacity: 0, duration: 1.5, ease: "power2.out" });

      // Orb scale in
      tl.from(orbRef.current, { scale: 0, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1.2");

      tl.from(topLineRef.current.children, {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
      }, "-=0.8");

      tl.from(row1Ref.current, { yPercent: 100, duration: 1, ease: "power4.out" }, "-=0.4");
      tl.from(row2Ref.current, { yPercent: 100, duration: 1, ease: "power4.out" }, "-=0.7");
      tl.from(circleRef.current, { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
      tl.from(row3Ref.current, { yPercent: 100, duration: 1, ease: "power4.out" }, "-=0.8");
      tl.from(bottomRef.current.children, { y: 30, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out" }, "-=0.4");
      tl.from(scrollRef.current, { opacity: 0, duration: 0.5 }, "-=0.2");

      gsap.to(circleRef.current, { rotation: 360, duration: 20, repeat: -1, ease: "none" });

      // Orb follows mouse with lag
      const onMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 60;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        gsap.to(orbRef.current, { x, y, duration: 1.5, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMouseMove);

      return () => window.removeEventListener("mousemove", onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nameStyle = {
    fontSize: "clamp(3.2rem, 13vw, 11rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.04em",
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Animated Grid Background */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.3,
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />

      {/* Floating Gradient Orb */}
      <div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          opacity: 0.12,
          filter: "blur(60px)",
        }}
      />

      {/* Decorative Floating Shapes */}
      <div
        className="absolute top-[20%] right-[10%] w-3 h-3 rounded-full pointer-events-none"
        style={{ backgroundColor: "var(--color-accent)", opacity: 0.5, animation: "float 6s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[30%] left-[8%] w-2 h-2 rounded-full pointer-events-none"
        style={{ backgroundColor: "var(--color-accent)", opacity: 0.4, animation: "float 8s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute top-[40%] left-[20%] w-16 h-16 rounded-full pointer-events-none"
        style={{ border: "1px solid var(--color-accent)", opacity: 0.15, animation: "float 10s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[25%] right-[15%] w-24 h-24 pointer-events-none"
        style={{ border: "1px solid var(--color-border)", opacity: 0.2, animation: "spin 30s linear infinite", borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
      />

      {/* Top Info Bar */}
      <div ref={topLineRef} className="absolute top-24 md:top-32 left-0 w-full px-6 md:px-12 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted">React.js Developer</span>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted hidden sm:block">Based in Cairo, Egypt</span>
          <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted">
            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "#22c55e", animation: "pulse 2s infinite" }} />
            Available for work
          </span>
        </div>
      </div>

      {/* Main Name */}
      <div className="px-6 md:px-12 lg:px-24 w-full relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <h1 ref={row1Ref} className="font-heading font-extrabold text-foreground" style={nameStyle}>NADER</h1>
          </div>
          <div className="overflow-hidden">
            <div ref={row2Ref} className="flex items-center gap-3 md:gap-6">
              <h1 className="font-heading font-extrabold text-foreground" style={nameStyle}>HANI</h1>
              <div ref={circleRef} className="shrink-0 w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center" style={{ border: "1.5px solid var(--color-accent)" }}>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs><path id="cp" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" /></defs>
                  <text className="fill-accent" style={{ fontSize: "11.5px", letterSpacing: "2.5px" }}>
                    <textPath href="#cp">FRONTEND • DEVELOPER • REACT •</textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={row3Ref} className="flex items-center gap-4 md:gap-8">
              <h1 className="font-heading font-extrabold shrink-0" style={{ ...nameStyle, WebkitTextStroke: "1.5px var(--color-accent)", color: "transparent" }}>ALI</h1>
              <div className="h-[1.5px] flex-1" style={{ backgroundColor: "var(--color-border)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div ref={bottomRef} className="absolute bottom-16 md:bottom-14 left-0 w-full px-6 md:px-12 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <p className="font-body text-muted text-xs md:text-sm max-w-xs md:max-w-sm leading-relaxed">
            Specializing in building responsive, interactive web applications with clean code and exceptional user experiences.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="group flex items-center gap-3 font-heading text-xs md:text-sm uppercase tracking-[0.15em] text-foreground shrink-0" data-hover>
            <span className="hover-link">Let&apos;s Connect</span>
            <span className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ border: "1px solid var(--color-border)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground -rotate-45 group-hover:rotate-0 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll */}
      <div ref={scrollRef} className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <div className="w-[1px] h-8 md:h-10 relative overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
          <div className="w-full h-4 absolute top-0 left-0" style={{ backgroundColor: "var(--color-accent)", animation: "scrollDown 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
}
