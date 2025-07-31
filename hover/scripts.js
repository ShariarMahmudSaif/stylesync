document.addEventListener('click', (e) => {
  if (e.target.classList.contains('effect')) {
    e.target.classList.add('clicked');
    setTimeout(() => e.target.classList.remove('clicked'), 600);
  }
  if (e.target.classList.contains('copy-btn')) {
    const snippet = e.target.previousElementSibling.querySelector('code').textContent;
    navigator.clipboard.writeText(snippet)
      .then(() => alert('Code copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  }
});