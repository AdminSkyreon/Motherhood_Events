(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  const progress = document.querySelector(".scroll-progress-bar");
  const navLinks = nav?.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll("main section[id], main .hero[id]");
  const year = document.querySelector("#year");

  if (year) year.textContent = String(new Date().getFullYear());

  const closeNav = () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;

    let current = "";
    const offset = 120;
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) current = section.id;
    });
    navLinks?.forEach((link) => {
      const match = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", match);
    });

    if (siteHeader && hero) {
      siteHeader.classList.toggle("is-scrolled", hero.getBoundingClientRect().bottom <= 80);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const siteHeader = document.querySelector(".site-header");
  const hero = document.querySelector(".hero--cover");

  const facultySection = document.querySelector(".faculty-section");
  const facultyExplore = document.querySelector("#facultyExplore");
  const facultyCollapse = document.querySelector("#facultyCollapse");
  const facultyPanel = document.querySelector("#facultyPanel");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const openFaculty = () => {
    if (!facultySection || facultySection.classList.contains("is-open")) return;
    facultySection.classList.add("is-open");
    facultyExplore?.setAttribute("aria-expanded", "true");
    facultyPanel?.setAttribute("aria-hidden", "false");
    facultyCollapse?.removeAttribute("hidden");
    const delay = reducedMotion ? 0 : 420;
    window.setTimeout(() => {
      facultyPanel?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }, delay);
  };

  const closeFaculty = () => {
    if (!facultySection) return;
    facultySection.classList.remove("is-open");
    facultyExplore?.setAttribute("aria-expanded", "false");
    facultyPanel?.setAttribute("aria-hidden", "true");
    facultyCollapse?.setAttribute("hidden", "");
    document.querySelector("#facultyHero")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  facultyExplore?.addEventListener("click", openFaculty);
  facultyCollapse?.addEventListener("click", closeFaculty);
})();
