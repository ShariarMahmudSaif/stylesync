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

  // Fourier Loader (Loader 11)
  const fourierCanvas = document.getElementById('fourier-canvas');
  if (fourierCanvas) {
    const ctx = fourierCanvas.getContext('2d');
    fourierCanvas.width = 50;
    fourierCanvas.height = 50;
    let t = 0;
    function drawFourier() {
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      for (let x = 0; x < 50; x += 0.5) {
        let y = 25 + 15 * Math.sin(0.1 * x + t) + 10 * Math.sin(0.2 * x + t);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.1;
      requestAnimationFrame(drawFourier);
    }
    drawFourier();
  }

  // Kinetoscope Loader (Loader 43)
  const kinetoscopeCanvas = document.getElementById('kinetoscope-canvas');
  if (kinetoscopeCanvas) {
    const ctx = kinetoscopeCanvas.getContext('2d');
    kinetoscopeCanvas.width = 50;
    kinetoscopeCanvas.height = 50;
    let frame = 0;
    function drawKinetoscope() {
      ctx.clearRect(0, 0, 50, 50);
      ctx.fillStyle = '#3b82f6';
      for (let i = 0; i < 8; i++) {
        const angle = (frame + i * 45) * Math.PI / 180;
        const x = 25 + 15 * Math.cos(angle);
        const y = 25 + 15 * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
      frame += 5;
      requestAnimationFrame(drawKinetoscope);
    }
    drawKinetoscope();
  }
});