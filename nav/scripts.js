document.addEventListener('DOMContentLoaded', () => {
  // Toggle Mobile Menu
  const burgers = document.querySelectorAll('.burger');
  burgers.forEach(burger => {
    burger.addEventListener('click', () => {
      const navbar = burger.closest('.navbar');
      navbar.classList.toggle('open');
      const menu = navbar.querySelector('.nav-menu');
      if (menu) {
        menu.style.display = navbar.classList.contains('open') ? 'flex' : 'none';
      }
    });
  });

  // Copy CSS Code
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = 'Copy';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // Scroll-Spy for Navbar 25 and 32
  const scrollNavs = document.querySelectorAll('.navbar-25, .navbar-32');
  window.addEventListener('scroll', () => {
    scrollNavs.forEach(nav => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  });

  // Scroll-Spy for Navbar 37
  const nav37Links = document.querySelectorAll('.navbar-37 .nav-link');
  nav37Links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      nav37Links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Sequential Fade-In for Navbar 38
  const nav38Links = document.querySelectorAll('.navbar-38 .nav-link');
  nav38Links.forEach(link => {
    link.classList.add('active');
  });
});