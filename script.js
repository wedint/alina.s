document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.intro, .services, .works, .booking, .price-item, .gallery-card');
  items.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--delay', `${Math.min(i * 45, 180)}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  items.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Sticky CTA: show once hero is scrolled past, hide once booking is reached
  const stickyCta = document.getElementById('stickyCta');
  const heroSection = document.querySelector('.hero');
  const bookingSection = document.getElementById('booking');
  if (stickyCta && heroSection && bookingSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        stickyCta.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    heroObserver.observe(heroSection);

    const bookingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) stickyCta.classList.remove('is-visible');
      });
    }, { threshold: 0.15 });
    bookingObserver.observe(bookingSection);
  }
});
