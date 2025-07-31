document.addEventListener('DOMContentLoaded', () => {
  // Clear Button Functionality (Input 5)
  document.querySelectorAll('.clear-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      input.value = '';
      input.dispatchEvent(new Event('input'));
    });
  });

  // Password Toggle Functionality (Input 6)
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '👁‍🗨';
    });
  });

  // Character Counter Functionality (Input 7)
  document.querySelectorAll('.input-7').forEach(input => {
    const counter = input.nextElementSibling;
    input.addEventListener('input', () => {
      counter.textContent = `${input.value.length}/50`;
    });
  });

  // Validation Shake Functionality (Input 14)
  document.querySelectorAll('.input-14').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.toggle('invalid', input.value.length < 3);
    });
  });

  // Scroll-Aware Functionality (Input 29)
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.input-29').forEach(input => {
      input.classList.toggle('scrolled', window.scrollY > 100);
    });
  });

  // Masked Input Functionality (Input 24)
  document.querySelectorAll('.input-24').forEach(input => {
    input.addEventListener('input', () => {
      let value = input.value.replace(/\D/g, '');
      if (value.length > 3) value = value.slice(0, 3) + '-' + value.slice(3);
      if (value.length > 7) value = value.slice(0, 7) + '-' + value.slice(7, 11);
      input.value = value;
    });
  });

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

  // Video Background Auto-Play (Input 34)
  document.querySelectorAll('.bg-video').forEach(video => {
    video.play().catch(error => console.error('Video autoplay failed:', error));
  });
});