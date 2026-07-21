(() => {
  'use strict';

  /* ─────────────────────────────────────────
     CORE UTILITIES
  ───────────────────────────────────────── */
  const $ = (s, sc = document) => sc.querySelector(s);
  const $$ = (s, sc = document) => [...sc.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.matchMedia('(pointer: fine) and (min-width: 761px)').matches;
  const hasGSAP = () => !!(window.gsap && window.ScrollTrigger);

  /* ─── GSAP SETUP ─── */
  try { if (hasGSAP()) gsap.registerPlugin(ScrollTrigger); } catch (_) {}

  /* ═══════════════════════════════════════════════════════════
     ① NAVIGATION — unchanged
  ═══════════════════════════════════════════════════════════ */
  function initNavigation() {
    const button = $('#menuButton');
    const nav    = $('#siteNav');
    if (!button || !nav) return;

    const close = () => {
      nav.classList.remove('open');
      button.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
      document.body.style.overflow = '';
    };

    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    $$('a', nav).forEach(link => link.addEventListener('click', close));
  }

  /* ═══════════════════════════════════════════════════════════
     ② CAROUSEL — unchanged, extended to re-trigger hero entrance
  ═══════════════════════════════════════════════════════════ */
  function initCarousel() {
    const slides = $$('.hero-slide');
    const dots   = $('#carouselDots');
    if (!slides.length || !dots) return;

    let current = 0, timer;

    const setSlide = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      $$('button', dots).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
      if (hasGSAP() && !reducedMotion) heroSlideEntrance(slides[current]);
    };

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => { setSlide(i); restart(); });
      dots.append(dot);
    });

    $('#previousSlide')?.addEventListener('click', () => { setSlide(current - 1); restart(); });
    $('#nextSlide')?.addEventListener('click',     () => { setSlide(current + 1); restart(); });

    const start   = () => { if (!reducedMotion) timer = setInterval(() => setSlide(current + 1), 6000); };
    const restart = () => { clearInterval(timer); start(); };

    $('#heroSlides')?.addEventListener('mouseenter', () => clearInterval(timer));
    $('#heroSlides')?.addEventListener('mouseleave', start);

    setSlide(0);
    start();
  }

  /* ═══════════════════════════════════════════════════════════
     ③ COUNTERS + REVEALS
     Counters always run. Reveal IO only runs without GSAP.
  ═══════════════════════════════════════════════════════════ */
  function initCountersAndReveals() {

    /* Fallback reveal observer (skipped when GSAP is active) */
    if (!hasGSAP() || reducedMotion) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.10 });

      $$('.reveal').forEach(el => {
        const parentGrid = el.closest('.feature-grid,.program-grid,.faculty-grid,.result-grid,.quote-grid');
        if (parentGrid && !reducedMotion) {
          const idx = Array.from(parentGrid.children).indexOf(el.closest('article,figure,div') || el);
          if (idx !== -1) el.style.transitionDelay = `${idx * 0.08}s`;
        }
        observer.observe(el);
      });
    }

    /* Metric counters — always run */
    const metrics = $('.metric-bar');
    if (!metrics) return;

    const countNode = node => {
      const target = Number(node.dataset.count);
      const suffix = node.dataset.suffix || '';
      if (reducedMotion) { node.textContent = `${target}${suffix}`; return; }
      const t0 = performance.now(), dur = 1900;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        node.textContent = `${Math.round(target * (1 - Math.pow(1 - p, 4))).toLocaleString()}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('[data-count]', entry.target).forEach(countNode);
          entry.target._countObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 }).observe(metrics);
  }

  /* ═══════════════════════════════════════════════════════════
     ④ GALLERY LIGHTBOX — unchanged
  ═══════════════════════════════════════════════════════════ */
  function initGallery() {
    const dialog = $('#lightbox');
    const image  = $('#lightboxImage');
    if (!dialog || !image) return;

    $$('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        image.src = item.dataset.image;
        image.alt = item.dataset.alt;
        dialog.showModal();
      });
    });

    $('.lightbox-close', dialog)?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }

  /* ═══════════════════════════════════════════════════════════
     ⑤ FORM — unchanged
  ═══════════════════════════════════════════════════════════ */
  function initForm() {
    const form   = $('#enquiryForm');
    const status = $('#formStatus');
    if (!form || !status) return;

    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields with valid information.';
        status.classList.remove('success');
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 400);
        form.reportValidity();
        return;
      }

      const data    = new FormData(form);
      const message = [
        'Hello Balram Sir Tuitions, I would like to enquire about admission.', '',
        `Name: ${data.get('name')}`,
        `Phone: ${data.get('phone')}`,
        data.get('email') ? `Email: ${data.get('email')}` : '',
        `Class: ${data.get('class')}`,
        `Board: ${data.get('board')}`,
        `Subject interest: ${data.get('subject')}`,
        data.get('message') ? `Learning goals: ${data.get('message')}` : ''
      ].filter(Boolean).join('\n');

      status.textContent = 'Opening WhatsApp…';
      status.classList.add('success');
      window.open(`https://wa.me/918955179570?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     ⑥ SCROLL UI — unchanged
  ═══════════════════════════════════════════════════════════ */
  function initScrollUI() {
    const progress  = $('#scrollProgress');
    const backToTop = $('#backToTop');
    const header    = $('#siteHeader');
    const navLinks  = $$('.site-nav a:not(.nav-mobile-link)');
    const sections  = $$('section[id]');

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
      backToTop?.classList.toggle('show', window.scrollY > 600);
      header?.classList.toggle('scrolled', window.scrollY > 50);

      const pos = window.scrollY + 120;
      sections.forEach(sec => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          const id = sec.id;
          navLinks.forEach(lnk => lnk.classList.toggle('active', lnk.getAttribute('href') === `#${id}`));
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backToTop?.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    );
  }

  /* ═══════════════════════════════════════════════════════════
     ⑦ ACCORDION — unchanged (one-open logic)
  ═══════════════════════════════════════════════════════════ */
  function initAccordion() {
    const details = $$('.faq-list details');
    details.forEach(detail => {
      const summary = $('summary', detail);
      if (!summary) return;
      summary.addEventListener('click', () => {
        if (!detail.hasAttribute('open'))
          details.forEach(item => { if (item !== detail) item.removeAttribute('open'); });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     ⑧ BUTTON RIPPLES — unchanged
  ═══════════════════════════════════════════════════════════ */
  function initButtonRipples() {
    $$('.button').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('button-ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     ⑨ CARD TILTS — CSS fallback (used only when no GSAP)
  ═══════════════════════════════════════════════════════════ */
  function initCardTilts() {
    if (reducedMotion) return;
    $$('.feature-card,.program-card,.fee-card,.result-card,.quote-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     ★★★  GSAP PREMIUM ANIMATION MODULES  ★★★
  ══════════════════════════════════════════════════════════════ */

  /* ── 1. PAGE LOADER ── */
  function initLoader() {
    if (!hasGSAP() || reducedMotion) return Promise.resolve();

    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="loader-inner"><span class="loader-brand">B</span></div>';
    document.body.prepend(loader);

    return new Promise(resolve => {
      gsap.timeline({ onComplete() { loader.remove(); resolve(); } })
        .from('.loader-brand', { scale: 0, opacity: 0, duration: 0.42, ease: 'back.out(2.2)' })
        .to('.loader-brand',  { scale: 1.16, duration: 0.18, ease: 'power2.in' }, '+=0.24')
        .to('.loader-brand',  { scale: 1.0,  duration: 0.10, ease: 'power2.out' })
        .to('#page-loader',   { yPercent: -100, duration: 0.62, ease: 'power4.inOut' });
    });
  }

  /* ── 2. HERO CINEMATIC ENTRANCE ── */
  function initHeroGSAP() {
    if (!hasGSAP()) return;
    const slide = $('.hero-slide.is-active');
    if (slide) heroSlideEntrance(slide);

    /* Header slide-in from top */
    gsap.fromTo('#siteHeader',
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.72, ease: 'power3.out', delay: 0.12 }
    );
  }

  function heroSlideEntrance(slide) {
    if (!slide || !hasGSAP()) return;

    const eyebrow = $('.eyebrow',   slide);
    const heading = $('h1,h2',     slide);
    const copy    = $('.hero-copy', slide);
    const buttons = $$('.button',  slide);
    const stat    = $('.hero-stat', slide);
    const img     = $('img',       slide);

    /* Neutralise conflicting CSS transitions — GSAP takes full control */
    [eyebrow, heading, copy, stat, ...buttons].filter(Boolean).forEach(el => {
      el.style.transition = 'none';
      el.style.opacity    = '0';
      el.style.transform  = 'none';
    });

    const tl = gsap.timeline({ delay: 0.06 });

    if (eyebrow) tl.fromTo(eyebrow,
      { opacity: 0, y: 22, letterSpacing: '0.30em' },
      { opacity: 1, y:  0, letterSpacing: '0.16em', duration: 0.88, ease: 'power3.out' }
    );

    if (heading) tl.fromTo(heading,
      { opacity: 0, y: 58, clipPath: 'inset(0 0 28% 0)' },
      { opacity: 1, y:  0, clipPath: 'inset(0 0 0% 0)',  duration: 1.06, ease: 'power4.out' },
      '-=0.50'
    );

    if (copy) tl.fromTo(copy,
      { opacity: 0, y: 30 },
      { opacity: 1, y:  0, duration: 0.88, ease: 'power3.out' },
      '-=0.62'
    );

    if (buttons.length) tl.fromTo(buttons,
      { opacity: 0, y: 18, scale: 0.92 },
      { opacity: 1, y:  0, scale:  1,    stagger: 0.12, duration: 0.72, ease: 'back.out(1.5)' },
      '-=0.55'
    );

    if (stat) tl.fromTo(stat,
      { opacity: 0, x: 52, scale: 0.93 },
      { opacity: 1, x:  0, scale:  1,   duration: 0.88, ease: 'power3.out' },
      '-=0.58'
    );

    if (img) gsap.fromTo(img,
      { scale: 1.14 },
      { scale: 1.06, duration: 8, ease: 'power1.inOut', overwrite: true }
    );
  }

  /* ── 3. HERO PARTICLES ── */
  function initParticles() {
    if (!isDesktop() || reducedMotion) return;
    const hero = $('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'heroParticles';
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let W, H, raf;

    const resize = () => {
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const N = 52;
    const pts = Array.from({ length: N }, () => ({
      x:  Math.random() * 1000,
      y:  Math.random() * 650,
      r:  Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.24,
      vy: (Math.random() - 0.5) * 0.24,
      a:  Math.random() * 0.42 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,174,56,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('beforeunload', () => cancelAnimationFrame(raf));
  }

  /* ── 4. MOUSE PARALLAX ON HERO ── */
  function initMouseParallax() {
    if (!isDesktop() || reducedMotion || !hasGSAP()) return;
    const hero = $('.hero');
    if (!hero) return;
    let ticking = false;

    hero.addEventListener('mousemove', e => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { left, top, width, height } = hero.getBoundingClientRect();
        const nx = (e.clientX - left - width  / 2) / width;
        const ny = (e.clientY - top  - height / 2) / height;
        const activeSlide = $('.hero-slide.is-active', hero);
        const img = $('img',          activeSlide);
        const pat = $('.hero-pattern', activeSlide);
        if (img) gsap.to(img, { x: nx * 18, y: ny * 10, duration: 1.4, ease: 'power2.out', overwrite: true });
        if (pat) gsap.to(pat, { x: nx * -24, y: ny * -13, duration: 1.6, ease: 'power2.out', overwrite: true });
        ticking = false;
      });
    });

    hero.addEventListener('mouseleave', () => {
      const activeSlide = $('.hero-slide.is-active', hero);
      const img = $('img',          activeSlide);
      const pat = $('.hero-pattern', activeSlide);
      if (img) gsap.to(img, { x: 0, y: 0, duration: 1.6, ease: 'power2.out' });
      if (pat) gsap.to(pat, { x: 0, y: 0, duration: 1.6, ease: 'power2.out' });
    });
  }

  /* ── 5. MAGNETIC ELEMENTS ── */
  function initMagneticButtons() {
    if (!isDesktop() || reducedMotion || !hasGSAP()) return;

    $$('.button:not(.button-full), .carousel-button, .floating-action, .back-to-top').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) * 0.30;
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) * 0.30;
        gsap.to(el, { x: dx, y: dy, duration: 0.36, ease: 'power2.out', overwrite: true });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.72, ease: 'elastic.out(1, 0.42)', overwrite: true });
      });
    });
  }

  /* ── 6. CURSOR GLOW ── */
  function initCursorGlow() {
    if (!isDesktop() || reducedMotion || !hasGSAP()) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    window.addEventListener('mousemove', e => {
      gsap.to(glow, { x: e.clientX, y: e.clientY, duration: 0.78, ease: 'power2.out', overwrite: true });
    });

    const big   = () => gsap.to(glow, { scale: 2.2, duration: 0.30, ease: 'power2.out' });
    const small = () => gsap.to(glow, { scale: 1.0, duration: 0.35, ease: 'power2.out' });

    $$('a, button, .feature-card, .program-card, .gallery-item, input, select, textarea').forEach(el => {
      el.addEventListener('mouseenter', big);
      el.addEventListener('mouseleave', small);
    });
  }

  /* ── 7. AMBIENT ORBS ── */
  function initAmbientOrbs() {
    if (!hasGSAP() || reducedMotion) return;

    const cfgs = [
      { sel: '.about',      color: 'rgba(22,102,216,0.07)',   w: 340, h: 340, top: '5%',   left:  '-10%' },
      { sel: '#why-us',     color: 'rgba(242,174,56,0.06)',   w: 280, h: 280, top: '62%',  right: '-8%'  },
      { sel: '#programs',   color: 'rgba(22,102,216,0.055)',  w: 320, h: 320, top: '-4%',  left:  '-5%'  },
      { sel: '.admissions', color: 'rgba(255,255,255,0.045)', w: 440, h: 440, top: '-15%', right: '-13%' }
    ];

    cfgs.forEach((cfg, i) => {
      const parent = $(cfg.sel);
      if (!parent) return;
      const cs = getComputedStyle(parent);
      if (cs.overflow === 'visible' || !cs.overflow) parent.style.overflow = 'hidden';

      const orb = document.createElement('div');
      orb.className = 'ambient-orb';
      orb.style.cssText = [
        `width:${cfg.w}px`, `height:${cfg.h}px`,
        `background:radial-gradient(circle,${cfg.color} 0%,transparent 70%)`,
        `top:${cfg.top || 'auto'}`, `left:${cfg.left || 'auto'}`,
        `right:${cfg.right || 'auto'}`, `bottom:${cfg.bottom || 'auto'}`
      ].join(';');
      parent.appendChild(orb);

      gsap.to(orb, {
        x: i % 2 === 0 ? 48 : -48,
        y: 38,
        duration: 8 + i * 1.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });
    });
  }

  /* ── 8. SCROLL REVEALS — per-section, unique animations ── */
  function initScrollRevealGSAP() {
    if (!hasGSAP()) return;

    /* Helper: compact ScrollTrigger config */
    const st = (trigger, start = 'top 82%', extra = {}) =>
      ({ trigger, start, once: true, ...extra });

    /* ─ METRIC BAR ─ */
    gsap.fromTo($$('.metric-grid > div'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.10, duration: 0.88, ease: 'power3.out',
        scrollTrigger: st('.metric-bar', 'top 92%') }
    );

    /* ─ ABOUT ─ */
    const aboutImg  = $('.about .image-composition');
    const aboutCopy = $('.about .section-copy');
    if (aboutImg)  gsap.fromTo(aboutImg,  { opacity: 0, x: -68, scale: 0.94 }, { opacity: 1, x: 0, scale: 1, duration: 1.12, ease: 'power3.out', scrollTrigger: st(aboutImg, 'top 85%') });
    if (aboutCopy) {
      gsap.fromTo(aboutCopy, { opacity: 0, x: 58 }, { opacity: 1, x: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: st(aboutCopy, 'top 85%') });
      gsap.fromTo($$('.value-list > div', aboutCopy), { opacity: 0, x: 36 }, { opacity: 1, x: 0, stagger: 0.14, duration: 0.82, ease: 'power3.out', scrollTrigger: st(aboutCopy, 'top 78%') });
    }

    /* ─ SECTION HEADINGS (generic) ─ */
    $$('.section-heading').forEach(hd => {
      const kids = [$$('.eyebrow', hd)[0], $('h2', hd), $$('p:not(.eyebrow)', hd)[0]].filter(Boolean);
      if (kids.length) gsap.fromTo(kids, { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.11, duration: 0.90, ease: 'power3.out', scrollTrigger: st(hd, 'top 86%') });
    });

    /* ─ FEATURE CARDS (cascade with perspective) ─ */
    const fCards = $$('.feature-card');
    if (fCards.length) gsap.fromTo(fCards,
      { opacity: 0, y: 58, scale: 0.90, rotateX: 12 },
      { opacity: 1, y: 0,  scale: 1,    rotateX:  0, stagger: { amount: 0.68, from: 'start' }, duration: 0.88, ease: 'power3.out', scrollTrigger: st('#why-us', 'top 75%') }
    );

    /* ─ PROGRAM CARDS (3D flip-in) ─ */
    const pCards = $$('.program-card');
    if (pCards.length) gsap.fromTo(pCards,
      { opacity: 0, y: 68, rotateY: -12 },
      { opacity: 1, y:  0, rotateY:   0, stagger: 0.15, duration: 1.02, ease: 'power3.out', transformOrigin: 'center top', scrollTrigger: st('#programs', 'top 78%') }
    );

    /* ─ SUBJECTS (scatter from random positions) ─ */
    const sTags = $$('.subject-list span');
    if (sTags.length) gsap.fromTo(sTags,
      { opacity: 0, scale: 0.62, y: 24 },
      { opacity: 1, scale: 1,    y:  0, stagger: { amount: 0.52, from: 'random' }, duration: 0.64, ease: 'back.out(1.9)', scrollTrigger: st('#subjects', 'top 80%') }
    );

    /* ─ FACULTY (scale pop) ─ */
    const facCards = $$('.faculty-card');
    if (facCards.length) gsap.fromTo(facCards,
      { opacity: 0, y: 58, scale: 0.86 },
      { opacity: 1, y:  0, scale:  1,   stagger: 0.18, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#faculty', 'top 80%') }
    );

    /* ─ FEES ─ */
    const feesInfo = $('#fees .section-copy');
    const feeCard  = $('.fee-card');
    if (feesInfo) gsap.fromTo(feesInfo, { opacity: 0, x: -52 }, { opacity: 1, x: 0, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#fees', 'top 80%') });
    if (feeCard)  gsap.fromTo(feeCard,  { opacity: 0, y: 68, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#fees', 'top 78%') });

    /* ─ RESULTS (rotate + rise) ─ */
    const rCards = $$('.result-card');
    if (rCards.length) gsap.fromTo(rCards,
      { opacity: 0, y: 52, rotate: -3 },
      { opacity: 1, y:  0, rotate:  0, stagger: 0.14, duration: 0.96, ease: 'power3.out', scrollTrigger: st('#results', 'top 80%') }
    );

    /* ─ GALLERY (zoom-in reveal) ─ */
    const gItems = $$('.gallery-item');
    if (gItems.length) gsap.fromTo(gItems,
      { opacity: 0, scale: 0.85, y: 36 },
      { opacity: 1, scale: 1,    y:  0, stagger: 0.12, duration: 0.96, ease: 'power3.out', scrollTrigger: st('#gallery', 'top 82%') }
    );

    /* ─ TESTIMONIALS (rotate-fade) ─ */
    const qCards = $$('.quote-card');
    if (qCards.length) gsap.fromTo(qCards,
      { opacity: 0, y: 46, rotate: -2 },
      { opacity: 1, y:  0, rotate:  0, stagger: 0.18, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#testimonials', 'top 82%') }
    );

    /* ─ PROCESS ─ */
    initProcessAnimation();

    /* ─ ADMISSIONS ─ */
    const adLeft = $('.admissions .section-copy');
    const adForm = $('.admission-form');
    if (adLeft) gsap.fromTo(adLeft, { opacity: 0, x: -52 }, { opacity: 1, x: 0, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#admissions', 'top 80%') });
    if (adForm) gsap.fromTo(adForm, { opacity: 0, x: 68, scale: 0.96 }, { opacity: 1, x: 0, scale: 1, duration: 1.06, ease: 'power3.out', scrollTrigger: st('#admissions', 'top 78%') });

    /* ─ FAQ ─ */
    const faqItems = $$('.faq-list details');
    if (faqItems.length) gsap.fromTo(faqItems,
      { opacity: 0, x: 44 },
      { opacity: 1, x:  0, stagger: 0.10, duration: 0.86, ease: 'power3.out', scrollTrigger: st('#faq', 'top 82%') }
    );

    /* ─ CONTACT ─ */
    const cItems  = $$('.contact-list > p');
    const mapCard = $('.map-card');
    if (cItems.length) gsap.fromTo(cItems, { opacity: 0, x: -32 }, { opacity: 1, x: 0, stagger: 0.10, duration: 0.76, ease: 'power3.out', scrollTrigger: st('#contact', 'top 82%') });
    if (mapCard) gsap.fromTo(mapCard, { opacity: 0, scale: 0.88, y: 38 }, { opacity: 1, scale: 1, y: 0, duration: 1.02, ease: 'power3.out', scrollTrigger: st('#contact', 'top 80%') });

    /* ─ FOOTER ─ */
    initFooterReveal();

    /* ─ GENERIC REMAINING .reveal ELEMENTS ─ */
    $$('.reveal').forEach(el => {
      if (el.closest('#about,#why-us,#programs,#subjects,#faculty,#fees,#results,#gallery,#testimonials,#admissions,#faq,#contact,.metric-bar,footer')) return;
      gsap.fromTo(el,
        { opacity: 0, y: 38 },
        { opacity: 1, y:  0, duration: 0.92, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%', once: true } }
      );
    });
  }

  /* ── 9. PROCESS LINE + STEP ANIMATION ── */
  function initProcessAnimation() {
    if (!hasGSAP()) return;
    const list = $('.process-list');
    if (!list) return;

    gsap.fromTo($$('b', list),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.15, duration: 0.62, ease: 'back.out(2.2)',
        scrollTrigger: { trigger: list, start: 'top 83%', once: true } }
    );

    gsap.fromTo($$('li', list),
      { opacity: 0, y: 40 },
      { opacity: 1, y:  0, stagger: 0.15, duration: 0.86, ease: 'power3.out',
        scrollTrigger: { trigger: list, start: 'top 83%', once: true,
          onEnter: () => setTimeout(() => list.classList.add('line-animated'), 80) } }
    );
  }

  /* ── 10. GALLERY PARALLAX (scrub) ── */
  function initGalleryParallax() {
    if (!hasGSAP() || !isDesktop() || reducedMotion) return;
    $$('.gallery-item img').forEach((img, i) => {
      gsap.to(img, {
        yPercent: i % 2 === 0 ? -11 : 9,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.gallery-item'), start: 'top bottom', end: 'bottom top', scrub: 1.8 }
      });
    });
  }

  /* ── 11. FOOTER REVEAL ── */
  function initFooterReveal() {
    if (!hasGSAP()) return;
    const footer = $('footer');
    if (!footer) return;

    gsap.fromTo($$('.footer-grid > div', footer),
      { opacity: 0, y: 46 },
      { opacity: 1, y:  0, stagger: 0.13, duration: 0.92, ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 90%', once: true } }
    );
    gsap.fromTo($('.footer-bottom', footer),
      { opacity: 0 },
      { opacity: 1, duration: 1.02, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 97%', once: true } }
    );
  }

  /* ── 12. GSAP CARD TILTS (3D) ── */
  function initCardTiltsGSAP() {
    if (!isDesktop() || reducedMotion || !hasGSAP()) return;

    $$('.feature-card,.program-card,.fee-card,.result-card,.quote-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const rx   = ((e.clientY - rect.top)  / rect.height - 0.5) * -14;
        const ry   = ((e.clientX - rect.left) / rect.width  - 0.5) *  14;
        gsap.to(card, { rotateX: rx, rotateY: ry, translateZ: 24, duration: 0.36, ease: 'power2.out', transformPerspective: 860, overwrite: true });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, translateZ: 0, duration: 0.76, ease: 'elastic.out(1, 0.42)', overwrite: true });
      });
    });
  }

  /* ── 13. CARD SHINE (sweep on hover) ── */
  function initCardShine() {
    if (!isDesktop() || reducedMotion || !hasGSAP()) return;

    $$('.program-card,.result-card,.quote-card,.fee-card').forEach(card => {
      const shine = document.createElement('div');
      shine.className = 'card-shine-el';
      Object.assign(shine.style, {
        position: 'absolute', inset: '0',
        background: 'linear-gradient(108deg, transparent 36%, rgba(255,255,255,0.07) 50%, transparent 64%)',
        transform: 'translateX(-115%)',
        pointerEvents: 'none',
        borderRadius: 'inherit',
        zIndex: '1'
      });
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(shine);

      card.addEventListener('mouseenter', () => {
        gsap.fromTo(shine, { x: '-115%' }, { x: '115%', duration: 0.70, ease: 'power2.out' });
      });
    });
  }

  /* ── 14. FORM INPUT FOCUS INTERACTIONS ── */
  function initFormGlow() {
    if (!hasGSAP()) return;
    $$('.form-grid input, .form-grid select, .form-grid textarea').forEach(el => {
      const lbl = el.closest('label');
      el.addEventListener('focus', () => {
        if (lbl) gsap.to(lbl, { scale: 1.016, duration: 0.30, ease: 'power2.out', transformOrigin: 'left center' });
      });
      el.addEventListener('blur', () => {
        if (lbl) gsap.to(lbl, { scale: 1, duration: 0.35, ease: 'power2.out' });
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     INIT — async so loader can complete before rest of site runs
  ══════════════════════════════════════════════════════════════ */
  async function init() {
    if ($('#year')) $('#year').textContent = String(new Date().getFullYear());

    /* Wait for loader dissolve */
    await initLoader();

    /* ─── Always-on (original) functions ─── */
    initNavigation();
    initCarousel();
    initCountersAndReveals();
    initGallery();
    initForm();
    initScrollUI();
    initAccordion();
    initButtonRipples();

    /* ─── Premium GSAP layer ─── */
    if (!reducedMotion && hasGSAP()) {
      initHeroGSAP();
      initParticles();
      initMouseParallax();
      initMagneticButtons();
      initCursorGlow();
      initAmbientOrbs();
      initScrollRevealGSAP();  /* covers per-section + process + footer */
      initGalleryParallax();
      initCardTiltsGSAP();
      initCardShine();
      initFormGlow();

      /* Refresh ScrollTrigger after all assets load */
      window.addEventListener('load', () => ScrollTrigger.refresh());

    } else if (!reducedMotion) {
      /* GSAP CDN unavailable → CSS fallback */
      initCardTilts();
    }
    /* reducedMotion: IO reveals run inside initCountersAndReveals, no animations */
  }

  document.addEventListener('DOMContentLoaded', init);
})();
