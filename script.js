const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const mobileNav = document.querySelector("#mobileNav");
const mobileMenuBtn = document.querySelector("#mobileMenuBtn");
const mobileNavClose = document.querySelector("#mobileNavClose");

const icons = {
  light:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  dark:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>',
};

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (!themeToggle) return;

  themeToggle.innerHTML = theme === "dark" ? icons.dark : icons.light;
  themeToggle.setAttribute(
    "aria-label",
    `Switch to ${theme === "dark" ? "light" : "dark"} mode`
  );
}

const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

setTheme(preferredTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

function openMobileNav() {
  mobileNav?.classList.add("open");
  document.body.classList.add("nav-open");
  mobileMenuBtn?.setAttribute("aria-expanded", "true");
}

function closeMobileNav() {
  mobileNav?.classList.remove("open");
  document.body.classList.remove("nav-open");
  mobileMenuBtn?.setAttribute("aria-expanded", "false");
}

mobileMenuBtn?.addEventListener("click", openMobileNav);
mobileNavClose?.addEventListener("click", closeMobileNav);
mobileNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMobileNav();
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" }
);

reveals.forEach((element) => revealObserver.observe(element));
