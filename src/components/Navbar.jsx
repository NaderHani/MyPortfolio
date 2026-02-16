import { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import logo from "../assets/logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.from(".mobile-link", {
        y: 60,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 md:py-4"
            : "py-5 md:py-6"
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--color-primary) 80%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className="flex items-center hover:opacity-70 transition-opacity duration-300"
          >
            <img
              src={logo}
              alt="NH Logo"
              className="h-9 md:h-10 w-auto transition-all duration-300"
              style={{ filter: isDark ? "none" : "invert(1)" }}
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="hover-link font-body text-[13px] uppercase tracking-[0.15em] text-foreground"
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-accent transition-colors duration-300"
              style={{ border: "1px solid var(--color-border)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-foreground"
              style={{ border: "1px solid var(--color-border)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-[5px] w-8 h-8 items-center justify-center"
              aria-label="Menu"
            >
              <span
                className="block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center"
                style={{
                  transform: isOpen
                    ? "rotate(45deg) translateY(3.25px)"
                    : "none",
                }}
              />
              <span
                className="block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center"
                style={{
                  transform: isOpen
                    ? "rotate(-45deg) translateY(-3.25px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
        style={{
          backgroundColor: "var(--color-primary)",
          clipPath: "inset(0 0 100% 0)",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="mobile-link font-heading text-4xl font-bold text-foreground hover:text-accent transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
