// ── Compteur animé ──────────────────────────────────────────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toLocaleString();
    }, 16);
  });
}

// ── Apparition au scroll ─────────────────────────────────────────────────────
function revealOnScroll() {
  const elements = document.querySelectorAll('.step, .card, .stat');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ── Compteurs déclenchés quand la section est visible ───────────────────────
function watchStats() {
  const statsSection = document.querySelector('.stats-section');
  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      animateCounters();
    }
  }, { threshold: 0.3 });

  if (statsSection) observer.observe(statsSection);
}

// ── Navbar : highlight lien actif au scroll ──────────────────────────────────
function activeNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--primary)'
        : '';
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  watchStats();
  activeNavOnScroll();
});
