// Toggle burger menu state
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) {
    console.error('Main element not found');
    return;
  }

  main.addEventListener('click', (e) => {
    const burger = e.target.closest('.burger');
    if (burger) {
      burger.classList.toggle('open');
      burger.classList.add('clicked');
      setTimeout(() => burger.classList.remove('clicked'), 200);
    }
  });

  // Keyboard navigation for burger toggle
  main.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const burger = e.target.closest('.burger');
      if (burger) {
        e.preventDefault();
        burger.classList.toggle('open');
        burger.classList.add('clicked');
        setTimeout(() => burger.classList.remove('clicked'), 200);
      }
    }
  });

  // Copy-to-clipboard for code snippets
  document.querySelectorAll('.copy-btn').forEach(button => {
    const copyText = () => {
      const snippet = button.previousElementSibling.querySelector('code')?.textContent;
      if (!snippet) {
        console.error('Code snippet not found for button:', button);
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(snippet).then(() => {
          button.textContent = 'Copied!';
          button.setAttribute('aria-label', 'Code copied to clipboard');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.setAttribute('aria-label', `Copy ${button.closest('.code-container').previousElementSibling.getAttribute('aria-label')} CSS`);
          }, 1000);
        }).catch(err => {
          console.error('Copy failed:', err);
          button.textContent = 'Error';
          button.setAttribute('aria-label', 'Copy failed');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.setAttribute('aria-label', `Copy ${button.closest('.code-container').previousElementSibling.getAttribute('aria-label')} CSS`);
          }, 1000);
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = snippet;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          button.textContent = 'Copied!';
          button.setAttribute('aria-label', 'Code copied to clipboard');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.setAttribute('aria-label', `Copy ${button.closest('.code-container').previousElementSibling.getAttribute('aria-label')} CSS`);
          }, 1000);
        } catch (err) {
          console.error('Copy failed:', err);
          button.textContent = 'Error';
          button.setAttribute('aria-label', 'Copy failed');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.setAttribute('aria-label', `Copy ${button.closest('.code-container').previousElementSibling.getAttribute('aria-label')} CSS`);
          }, 1000);
        }
        document.body.removeChild(textarea);
      }
    };

    button.addEventListener('click', copyText);
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyText();
      }
    });
  });
});