export default function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12 lg:px-24"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-muted">
          &copy; {new Date().getFullYear()} Nader Hani Ali. All rights reserved.
        </p>
        <p className="font-body text-sm text-muted">
          Designed & Built with{" "}
          <span className="text-accent">&hearts;</span>
        </p>
      </div>
    </footer>
  );
}
