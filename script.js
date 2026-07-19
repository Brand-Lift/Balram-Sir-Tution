(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────── */
  function initNavigation() {
    const button = $('#menuButton');
    const nav = $('#siteNav');

    if (!button || !nav) return;

    const close = () => {
      nav.classList.remove('open');
      button.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open navigation');
    };

    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    $$('a', nav).forEach(link => link.addEventListener('click', close));
  }

  /* ─────────────────────────────────────
     HEADER SCROLL SHRINK
  ───────────────────────────────────── */
  function initHeaderScroll() {
    const header = $('#siteHeader');
    if (!header) return;

    const update = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─────────────────────────────────────
     CAROUSEL
  ───────────────────────────────────── */
  function initCarousel() {
    const slides = $$('.hero-slide');
    const dots = $('#carouselDots');

    if (!slides.length || !dots) return;

    let current = 0;
    let timer;

    const activeState = active => active ? 'true' : 'false';

    const setSlide = index => {
      current = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });

      $$('button', dots).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-current', activeState(i === current));
      });
    };

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

      dot.addEventListener('click', () => {
        setSlide(i);
        restart();
      });

      dots.append(dot);
    });

    $('#previousSlide')?.addEventListener('click', () => {
      setSlide(current - 1);
      restart();
    });

    $('#nextSlide')?.addEventListener('click', () => {
      setSlide(current + 1);
      restart();
    });

    const start = () => {
      if (!reducedMotion) {
        timer = window.setInterval(() => setSlide(current + 1), 6000);
      }
    };

    const restart = () => {
      window.clearInterval(timer);
      start();
    };

    $('#heroSlides')?.addEventListener('mouseenter', () => window.clearInterval(timer));
    $('#heroSlides')?.addEventListener('mouseleave', start);

    setSlide(0);
    start();
  }

  /* ─────────────────────────────────────
     REVEALS + COUNTERS
  ───────────────────────────────────── */
  function initCountersAndReveals() {
    // All reveal variants
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
    const allRevealEls = revealClasses.flatMap(cls => $$(cls));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    allRevealEls.forEach(el => observer.observe(el));

    // Counter animation
    const metrics = $('.metric-bar');
    if (!metrics) return;

    const count = node => {
      const target = Number(node.dataset.count);
      const suffix = node.dataset.suffix || '';

      if (reducedMotion) {
        node.textContent = `${target}${suffix}`;
        return;
      }

      const start = performance.now();
      const duration = 1300;

      const update = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    const metricObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          $$('[data-count]', entry.target).forEach(count);
          metricObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    metricObserver.observe(metrics);
  }

  /* ─────────────────────────────────────
     3D TILT (feature cards)
  ───────────────────────────────────── */
  function initCardTilt() {
    if (reducedMotion) return;

    $$('.feature-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
        card.style.transition = 'box-shadow .3s ease, border-color .3s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1), box-shadow .3s ease, border-color .3s ease';
      });
    });
  }

  /* ─────────────────────────────────────
     BUTTON RIPPLE
  ───────────────────────────────────── */
  function initButtonRipple() {
    if (reducedMotion) return;

    $$('.button').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position:absolute;
          width:8px;height:8px;
          background:rgba(255,255,255,.5);
          border-radius:50%;
          left:${e.clientX - rect.left - 4}px;
          top:${e.clientY - rect.top - 4}px;
          transform:scale(0);
          animation:btn-ripple .55s ease-out forwards;
          pointer-events:none;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Inject ripple keyframes once
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes btn-ripple {
          to { transform: scale(40); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ─────────────────────────────────────
     GALLERY LIGHTBOX
  ───────────────────────────────────── */
  function initGallery() {
    const dialog = $('#lightbox');
    const image = $('#lightboxImage');

    if (!dialog || !image) return;

    $$('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        image.src = item.dataset.image;
        image.alt = item.dataset.alt;
        dialog.showModal();
      });
    });

    $('.lightbox-close', dialog)?.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', event => {
      if (event.target === dialog) dialog.close();
    });
  }

  /* ─────────────────────────────────────
     FORM — premium interactions
  ───────────────────────────────────── */
  function initForm() {
    const form = $('#enquiryForm');
    const status = $('#formStatus');

    if (!form || !status) return;

    // Clear error on input
    $$('input, select, textarea', form).forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('input-error');
      });
    });

    form.addEventListener('submit', event => {
      event.preventDefault();

      // Visual error feedback on invalid fields
      let hasError = false;
      $$('input[required], select[required]', form).forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('input-error');
          hasError = true;
        }
      });

      if (!form.checkValidity() || hasError) {
        status.textContent = 'Please complete the required fields with valid information.';
        status.classList.remove('success');
        form.reportValidity();
        return;
      }

      const data = new FormData(form);

      const message = [
        'Hello Balram Sir Tuitions, I would like to enquire about admission.',
        '',
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

      window.open(
        `https://wa.me/918955179570?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener'
      );
    });
  }

  /* ─────────────────────────────────────
     SCROLL PROGRESS + BACK TO TOP
  ───────────────────────────────────── */
  function initScrollUI() {
    const progress = $('#scrollProgress');
    const backToTop = $('#backToTop');

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (progress) {
        progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
      }

      backToTop?.classList.toggle('show', window.scrollY > 600);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    backToTop?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? 'auto' : 'smooth'
      });
    });
  }

  /* ─────────────────────────────────────
     FLOATING ACTIONS — pulse
  ───────────────────────────────────── */
  function initFloatingPulse() {
    if (reducedMotion) return;

    const whatsapp = $('.whatsapp-action');
    if (!whatsapp) return;

    // Add subtle pulse ring
    const style = document.createElement('style');
    style.textContent = `
      .whatsapp-action {
        animation: wa-pulse 2.8s ease-in-out infinite;
      }
      @keyframes wa-pulse {
        0%,100% { box-shadow: 0 5px 16px #00112b42, 0 0 0 0 rgba(32,165,90,.4); }
        50% { box-shadow: 0 5px 16px #00112b42, 0 0 0 10px rgba(32,165,90,0); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ─────────────────────────────────────
     SMOOTH ANCHOR SCROLL (active nav)
  ───────────────────────────────────── */
  function initActiveNav() {
    const sections = $$('section[id], div[id]');
    const navLinks = $$('.site-nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.style.color = active ? 'var(--blue)' : '';
        });
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ─────────────────────────────────────
     STAGGER CHILDREN REVEAL
  ───────────────────────────────────── */
  function initStaggerGrids() {
    // Feature grid, result grid, process list — wrap in stagger observer
    const grids = ['.feature-grid', '.result-grid', '.process-list', '.subject-list'];

    grids.forEach(sel => {
      const grid = $(sel);
      if (!grid) return;
      grid.classList.add('stagger');
      $$(':scope > *', grid).forEach(child => {
        if (!child.classList.contains('reveal')) {
          child.classList.add('reveal');
        }
      });
    });
  }

  /* ─────────────────────────────────────
     INIT ALL
  ───────────────────────────────────── */
  function init() {
    $('#year').textContent = String(new Date().getFullYear());

    initNavigation();
    initHeaderScroll();
    initCarousel();
    initStaggerGrids();
    initCountersAndReveals();
    initGallery();
    initForm();
    initScrollUI();
    initCardTilt();
    initButtonRipple();
    initFloatingPulse();
    initActiveNav();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
