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

  // Kinetic Scroll Text Functionality (Text 36)
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.text-36').forEach(text => {
      text.classList.toggle('scrolled', window.scrollY > 100);
    });
  });
});