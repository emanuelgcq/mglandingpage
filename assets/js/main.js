/* =========================================================
   Materiales y Decoraciones MG — interacciones
   Sin dependencias. Todo degrada con elegancia.
   ========================================================= */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hasScrollTimeline = CSS.supports('animation-timeline: view()');

  /* ---------------- Header: sombra + progreso ---------------- */
  const header = $('[data-header]');
  const bar = $('[data-progress]');
  const wa = $('[data-wa]');
  let ticking = false;

  const onScroll = () => {
    const y = scrollY;
    const max = document.body.scrollHeight - innerHeight;

    header?.toggleAttribute('data-stuck', y > 8);
    if (bar) bar.style.width = `${max > 0 ? Math.min(y / max, 1) * 100 : 0}%`;
    wa?.toggleAttribute('data-show', y > innerHeight * 0.5);

    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------------- Enlace activo en el nav ---------------- */
  const navLinks = $$('.nav-desktop a');
  const sections = navLinks
    .map((a) => $(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------------- Reveal (solo si no hay scroll-timeline) --------- */
  if (!hasScrollTimeline && !reduced.matches) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    $$('.section .reveal, .cta-inner.reveal').forEach((el) => io.observe(el));
  }

  /* ---------------- Marquee infinito ---------------- */
  const track = $('[data-marquee]');
  if (track) {
    const group = track.firstElementChild;
    if (group) {
      const clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    }
  }

  /* ---------------- Spotlight en las tarjetas ---------------- */
  const bento = $('[data-spotlight]');
  if (bento && matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    bento.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const card = e.target.closest('.card');
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    }, { passive: true });
  }

  /* ---------------- Tilt del visual del hero ---------------- */
  const tilt = $('[data-tilt]');
  const stack = tilt && $('.stack', tilt);
  if (stack && !reduced.matches && matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    const reset = () => { stack.style.setProperty('--ry', '-9deg'); stack.style.removeProperty('transform'); };

    tilt.addEventListener('pointermove', (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        stack.style.setProperty('--ry', `${-9 + px * 14}deg`);
        stack.style.transform = `rotateX(${6 - py * 12}deg)`;
      });
    }, { passive: true });

    tilt.addEventListener('pointerleave', reset, { passive: true });
  }

  /* ---------------- Contadores ---------------- */
  const fmt = new Intl.NumberFormat('es-VE');

  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const paint = (v) => { el.textContent = fmt.format(Math.round(v)) + suffix; };

    if (reduced.matches) { paint(target); return; }

    paint(0);   // el HTML trae el valor final; lo ponemos a cero para animarlo

    const io = new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();

      const dur = 1400;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        paint(target * (1 - Math.pow(1 - p, 3)));   // easeOutCubic
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });

    io.observe(el);
  });

  /* ---------------- Menú móvil: cerrar al navegar ---------------- */
  const menu = $('#menu-movil');
  menu?.addEventListener('click', (e) => {
    if (e.target.closest('a')) menu.hidePopover?.();
  });

  /* ---------------- Año del footer ---------------- */
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
