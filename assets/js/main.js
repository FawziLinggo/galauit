document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.getElementById("header");
  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const progressFill = document.querySelector(".scroll-meter__fill");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  const setScrollProgress = () => {
    if (!progressFill) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
  };

  const setActiveNav = () => {
    let current = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140) current = section;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
    });
  };

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("active");
        faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
      });

      if (!isActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const handleScroll = () => {
    setHeaderState();
    setScrollProgress();
    setActiveNav();
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);
});
