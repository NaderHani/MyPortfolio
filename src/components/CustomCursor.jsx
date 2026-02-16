import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.style.cursor = "none";
    const dot = dotRef.current;
    const outline = outlineRef.current;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
      }
    };

    const onEnterInteractive = () => {
      if (dot) {
        dot.style.width = "0px";
        dot.style.height = "0px";
      }
      if (outline) {
        outline.style.width = "80px";
        outline.style.height = "80px";
        outline.style.backgroundColor = "var(--color-accent)";
        outline.style.opacity = "0.15";
        outline.style.borderColor = "transparent";
      }
    };

    const onLeaveInteractive = () => {
      if (dot) {
        dot.style.width = "";
        dot.style.height = "";
      }
      if (outline) {
        outline.style.width = "";
        outline.style.height = "";
        outline.style.backgroundColor = "";
        outline.style.opacity = "";
        outline.style.borderColor = "";
      }
    };

    let raf;
    const loop = () => {
      outlinePos.current.x += (pos.current.x - outlinePos.current.x) * 0.12;
      outlinePos.current.y += (pos.current.y - outlinePos.current.y) * 0.12;
      if (outline) {
        outline.style.left = `${outlinePos.current.x}px`;
        outline.style.top = `${outlinePos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMouseMove);

    const bindInteractives = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    bindInteractives();
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={outlineRef} className="cursor-outline hidden md:block" />
    </>
  );
}
