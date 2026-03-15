/* ═══════════════════════════════════════
   STYLESYNC — Main Script
   ═══════════════════════════════════════ */
(() => {
  "use strict";

  // ─── DOM ───
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const root = document.documentElement;
  const loader = $("#loader");
  const header = $("#site-header");
  const backToTop = $("#backToTop");
  const burgerBtn = $("#burger");
  const mobileMenu = $("#mobile-menu");
  const mobileClose = $("#mobile-close");
  const themeToggle = $("#theme-toggle");
  const heroCanvas = $("#heroCanvas");

  // ─── THEME ───
  const THEME_KEY = "stylesync-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  // ─── LOADER ───
  function hideLoader() {
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }

  // ─── SCROLL ───
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header.classList.toggle("scrolled", y > 60);
        backToTop.classList.toggle("show", y > 500);
        ticking = false;
      });
      ticking = true;
    }
  });

  // ─── BACK TO TOP ───
  backToTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // ─── BURGER & MOBILE MENU ───
  function toggleMobile(open) {
    burgerBtn.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    burgerBtn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  burgerBtn.addEventListener("click", () => {
    toggleMobile(!burgerBtn.classList.contains("open"));
  });

  mobileClose.addEventListener("click", () => toggleMobile(false));

  // Close mobile menu on link click
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggleMobile(false));
  });

  // ─── HERO CANVAS — Floating Grid Dots ───
  function initHeroCanvas() {
    if (!heroCanvas) return;
    const ctx = heroCanvas.getContext("2d");
    const particles = [];
    const PARTICLE_COUNT = 50;

    function getColors() {
      const isDark = root.getAttribute("data-theme") === "dark";
      return isDark
        ? ["#ff8c00", "#ffb347", "#cc7000", "#f5f0e8"]
        : ["#e07800", "#cc7000", "#b36200", "#1a1a1a"];
    }

    function resize() {
      heroCanvas.width = heroCanvas.clientWidth;
      heroCanvas.height = heroCanvas.clientHeight;
    }

    function createParticle() {
      const colors = getColors();
      return {
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        size: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      };
    }

    resize();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }

    function draw() {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 140, 0, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        // Draw squares for brutalist feel
        ctx.fillRect(
          p.x - p.size / 2,
          p.y - p.size / 2,
          p.size,
          p.size
        );
        ctx.globalAlpha = 1;

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > heroCanvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > heroCanvas.height) p.dy *= -1;
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    draw();
  }

  // ─── RIPPLE EFFECT ───
  function initRipples() {
    $$(".ripple").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const circle = document.createElement("span");
        const d = Math.max(this.clientWidth, this.clientHeight);
        circle.style.width = circle.style.height = d + "px";
        circle.classList.add("ripple-circle");
        this.appendChild(circle);
        const rect = this.getBoundingClientRect();
        circle.style.left = e.clientX - rect.left - d / 2 + "px";
        circle.style.top = e.clientY - rect.top - d / 2 + "px";
        circle.addEventListener("animationend", () => circle.remove());
      });
    });
  }

  // ─── INTERSECTION OBSERVER — Animate on Scroll ───
  function initScrollAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    $$(".showcase-card, .demo-block, .cta-inner").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }

  // ─── LIBRARY FILTER ───
  function initLibraryFilter() {
    const btns = $$(".filter-btn");
    const items = $$(".lib-item");
    const dividers = $$(".lib-category");
    if (!btns.length || !items.length) return;

    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const cat = btn.dataset.filter;
        items.forEach((item) => {
          item.classList.toggle("hidden", cat !== "all" && item.dataset.cat !== cat);
        });
        dividers.forEach((d) => {
          d.classList.toggle("hidden", cat !== "all" && d.dataset.cat !== cat);
        });
      });
    });
  }

  // ─── INIT ───
  window.addEventListener("load", () => {
    hideLoader();
    initHeroCanvas();
    initRipples();
    initScrollAnimations();
    initLibraryFilter();
  });
})();
