document.addEventListener('DOMContentLoaded', () => {
  // Copy Button Functionality
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy', 2000);
      });
    });
  });

  // Ripple Click Div Functionality (Div 15)
  document.querySelectorAll('.div-15').forEach(div => {
    div.addEventListener('click', (e) => {
      const rect = div.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.animation = 'ripple 0.5s forwards';
      div.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
      div.classList.add('clicked');
      setTimeout(() => div.classList.remove('clicked'), 500);
    });
  });

  // Fade-In Scroll Div Functionality (Div 6)
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.div-6').forEach(div => {
      div.classList.toggle('scrolled', window.scrollY > 100);
    });
  });

  // Parallax Layered Div Functionality (Div 39)
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.div-39').forEach(div => {
      div.classList.toggle('scrolled', window.scrollY > 100);
    });
  });

  // Hover Canvas Div Functionality (Div 50)
  document.querySelectorAll('.div-50').forEach(div => {
    const canvas = document.createElement('canvas');
    canvas.width = div.offsetWidth;
    canvas.height = div.offsetHeight;
    div.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      };
    }
    for (let i = 0; i < 10; i++) {
      particles.push(createParticle());
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#facc15';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    div.addEventListener('mouseenter', () => animate());
  });
});