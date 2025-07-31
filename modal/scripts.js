document.addEventListener('DOMContentLoaded', () => {
  // Modal Trigger and Close
  const triggers = document.querySelectorAll('.trigger-btn');
  const overlays = document.querySelectorAll('.modal-overlay');
  const closeButtons = document.querySelectorAll('.close-btn');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('.modal').focus();

      // Special handling for specific modals
      if (modalId === 'modal-15') { // Form Wizard Modal
        const steps = modal.querySelectorAll('.form-step');
        steps[0].classList.add('active');
      }
      if (modalId === 'modal-16') { // Tabbed Modal
        const tabs = modal.querySelectorAll('.tab');
        tabs[0].classList.add('active');
      }
      if (modalId === 'modal-17') { // Stepper Modal
        const steps = modal.querySelectorAll('.step');
        steps[0].classList.add('active');
      }
      if (modalId === 'modal-18') { // Countdown Modal
        let time = 10;
        const countdown = modal.querySelector('.countdown');
        countdown.textContent = time;
        const interval = setInterval(() => {
          time--;
          countdown.textContent = time;
          if (time <= 0) {
            clearInterval(interval);
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
          }
        }, 1000);
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on overlay click
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // Keyboard Navigation (Escape key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      });
    }
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

  // Voice-Activated Modal (Modal 35)
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      if (event.results[0][0].transcript.toLowerCase().includes('open')) {
        const modal = document.getElementById('modal-35');
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal').focus();
      }
    };
    recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
    document.addEventListener('click', () => recognition.start(), { once: true });
  }

  // Draggable Modal (Modal 9)
  if (typeof interact !== 'undefined') {
    interact('.modal-9').draggable({
      listeners: {
        move(event) {
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        }
      }
    });
  }

  // Form Wizard Modal (Modal 15) - Basic step navigation
  const formWizard = document.querySelector('#modal-15');
  if (formWizard) {
    const steps = formWizard.querySelectorAll('.form-step');
    let currentStep = 0;
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.className = 'bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 mt-2';
    formWizard.querySelector('.modal').appendChild(nextBtn);
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove('active');
        currentStep++;
        steps[currentStep].classList.add('active');
      }
    });
  }

  // Tabbed Modal (Modal 16) - Basic tab switching
  const tabbedModal = document.querySelector('#modal-16');
  if (tabbedModal) {
    const tabs = tabbedModal.querySelectorAll('.tab');
    let currentTab = 0;
    const nextTabBtn = document.createElement('button');
    nextTabBtn.textContent = 'Next Tab';
    nextTabBtn.className = 'bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 mt-2';
    tabbedModal.querySelector('.modal').appendChild(nextTabBtn);
    nextTabBtn.addEventListener('click', () => {
      if (currentTab < tabs.length - 1) {
        tabs[currentTab].classList.remove('active');
        currentTab++;
        tabs[currentTab].classList.add('active');
      }
    });
  }

  // Stepper Modal (Modal 17) - Basic step navigation
  const stepperModal = document.querySelector('#modal-17');
  if (stepperModal) {
    const steps = stepperModal.querySelectorAll('.step');
    let currentStep = 0;
    const nextStepBtn = document.createElement('button');
    nextStepBtn.textContent = 'Next Step';
    nextStepBtn.className = 'bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 mt-2';
    stepperModal.querySelector('.modal').appendChild(nextStepBtn);
    nextStepBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        steps[currentStep].classList.remove('active');
        currentStep++;
        steps[currentStep].classList.add('active');
      }
    });
  }
});