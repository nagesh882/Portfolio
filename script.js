// Basic interactive/animation JS for the static portfolio
// Uses GSAP (loaded by script tag) + vanilla JS

document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
  });

  // GSAP hero / blob animation
  if (window.gsap) {
    gsap.from('.logo', { y: -20, opacity: 0, duration: 0.8, ease: 'power2.out' });
    gsap.from('.hero-hi', { x: -20, opacity: 0, duration: 0.8, delay: 0.1 });
    gsap.from('.hero-sub', { y: 12, opacity: 0, duration: 0.8, delay: 0.2 });
    gsap.to('.blob', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
    gsap.from('.project-card', { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.2 });
    gsap.from('.timeline-item', { x: -20, opacity: 0, duration: 0.7, stagger: 0.12, delay: 0.3 });
  }

  // simple stat counters for numbers (vanilla)
  function animateCount(el, to, duration = 1200) {
    const start = 0;
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(start + (to - start) * progress);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  // start counters when stats card visible
  const statsCard = document.getElementById('statsCard');
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const vals = statsCard.querySelectorAll('.stat-value');
        if (vals.length) {
          animateCount(vals[0], 750000, 1500); // records migrated (example)
          animateCount(vals[1], 6, 800); // major projects
        }
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsCard);

  // project card "tilt" interaction (small effect)
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (y - 0.5) * 6; // rotateX
      const ry = (x - 0.5) * -8; // rotateY
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // scroll reveal for timeline & sections (IntersectionObserver)
  const revealElems = document.querySelectorAll('.timeline-item, .section h2, .contact-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.15 });
  revealElems.forEach(el => revealObserver.observe(el));

  // small accessibility: focus outlines for keyboard users
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('show-focus');
    }
  });

  // contact form - basic visual feedback
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', () => {
      alert('Demo form — replace with your email integration (e.g., Formspree or your backend).');
    });
  }
});
