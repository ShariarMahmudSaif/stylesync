// DOM Elements
const body = document.body;
const loader = document.getElementById("loader");
const header = document.getElementById("site-header");
const backToTop = document.getElementById("backToTop");
const burgerBtn = document.getElementById("burger");
const burgerCanvas = document.getElementById("burgerCanvas");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");
const themeToggle = document.getElementById("theme-toggle");
const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const sampleModal = document.getElementById("sampleModal");
const closeSample = document.getElementById("closeSampleModal");
const heroCanvas = document.getElementById("heroCanvas");
const btnCanvases = document.querySelectorAll(".btnCanvas");

// SETTINGS STATE
const options = {
  burger: true,
  nav: true,
  textAnim: true,
  fonts: true,
  buttons: true,
  div: true,
  hover: true,
  inputs: true,
  loading: true,
  modal: true,
};

// UTIL: toggle class
const toggleClass = (el, cls, enabled) => {
  if (enabled) el.classList.add(cls);
  else el.classList.remove(cls);
};

// HIDE LOADER
function hideLoader() {
  setTimeout(() => {
    loader.style.display = "none";
  }, 800);
}

// SCROLL EVENTS
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  // nav shrink
  if (options.nav) {
    header.classList.toggle("scrolled", y > 50);
  }
  // back-to-top
  backToTop.classList.toggle("show", y > 500);
});

// BACK TO TOP
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// THEME TOGGLE
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  themeToggle.textContent = body.classList.contains("light-theme")
    ? "☀️"
    : "🌙";
});

// BURGER & MOBILE MENU
burgerBtn.addEventListener("click", () => {
  options.burger && burstBurgerParticles();
  burgerBtn.classList.toggle("open");
  const open = burgerBtn.classList.contains("open");
  mobileMenu.classList.toggle("open", open);
  burgerBtn.setAttribute("aria-expanded", open);
});
mobileClose.addEventListener("click", () => {
  burgerBtn.click();
});

// SETTINGS MODAL
settingsBtn.addEventListener("click", () => {
  settingsModal.classList.add("open");
});
closeSettings.addEventListener("click", () => {
  settingsModal.classList.remove("open");
});
settingsModal
  .querySelectorAll("input[type=checkbox]")
  .forEach((cb) => {
    cb.addEventListener("change", (e) => {
      const opt = e.target.dataset.opt;
      options[opt] = e.target.checked;
      // apply toggles
      toggleClass(burgerBtn, "open", options.burger && burgerBtn.classList.contains("open"));
      header.classList.toggle("scrolled", options.nav && window.scrollY > 50);
      toggleClass(body, "light-theme", options.fonts && body.classList.contains("light-theme"));
      toggleClass(loader, "hidden", !options.loading);
    });
  });

// SAMPLE MODAL (demo)
if (options.modal) {
  setTimeout(() => sampleModal.classList.add("open"), 1500);
}
closeSample.addEventListener("click", () =>
  sampleModal.classList.remove("open")
);

// INIT HERO CANVAS
const initHero = () => {
  const ctx = heroCanvas.getContext("2d");
  const particles = [];
  const colors = [options.text ? "#00ff99" : "#5500ff", "#cc00ff"];
  const create = () => ({
    x: Math.random() * heroCanvas.width,
    y: Math.random() * heroCanvas.height,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    col: colors[Math.floor(Math.random() * colors.length)],
  });
  for (let i = 0; i < 30; i++) particles.push(create());
  const animate = () => {
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > heroCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > heroCanvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  };
  const resize = () => {
    heroCanvas.width = heroCanvas.clientWidth;
    heroCanvas.height = heroCanvas.clientHeight;
  };
  window.addEventListener("resize", resize);
  resize();
  animate();
};

// BURGER PARTICLES
const burstBurgerParticles = () => {
  const ctx = burgerCanvas.getContext("2d");
  const w = burgerCanvas.width = 32;
  const h = burgerCanvas.height = 32;
  const parts = [];
  for (let i = 0; i < 12; i++) {
    parts.push({
      x: w / 2,
      y: h / 2,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 2,
      dy: (Math.random() - 0.5) * 2,
      life: 30,
      col: options.nav ? "#00ff99" : "#cc00ff",
    });
  }
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p) => {
      if (p.life > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
      }
    });
    if (parts.some((p) => p.life > 0)) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, w, h);
  };
  draw();
};

// BUTTON CANVASES
const initButtons = () => {
  btnCanvases.forEach((cnv) => {
    const ctx = cnv.getContext("2d");
    const w = (cnv.width = cnv.clientWidth);
    const h = (cnv.height = cnv.clientHeight);
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, options.buttons ? "#00ff99" : "#cc00ff");
    grad.addColorStop(1, options.buttons ? "#cc00ff" : "#00ff99");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
};

// BUTTON RIPPLE EFFECT
document.querySelectorAll(".ripple").forEach((btn) => {
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

// INITIALIZE ALL
window.addEventListener("load", () => {
  if (options.loading) hideLoader();
  initHero();
  initButtons();
});
