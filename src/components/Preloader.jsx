import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Name fade in
      tl.from(nameRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Line expand
      tl.from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Counter animate
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: function () {
            setCount(Math.round(this.targets()[0].val));
          },
        },
        "-=0.2"
      );

      // Fade out content
      tl.to(
        [nameRef.current, counterRef.current, lineRef.current],
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
        },
        "+=0.2"
      );

      // Slide overlay up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <p
        ref={nameRef}
        className="font-heading text-sm md:text-base tracking-[0.3em] uppercase text-muted mb-8"
      >
        Nader Hani Ali
      </p>
      <div
        ref={lineRef}
        className="w-16 h-[1px] bg-border mb-8 origin-center"
      />
      <span
        ref={counterRef}
        className="font-heading text-7xl md:text-9xl font-bold text-foreground tabular-nums"
      >
        {count}
      </span>
    </div>
  );
}
