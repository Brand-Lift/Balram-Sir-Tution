(() => {
  'use strict';

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  function initCountersAndReveals() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });

    $$('.reveal').forEach(element => observer.observe(element));

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

        if (progress < 1) {
          requestAnimationFrame(update);
        }
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
    }, { threshold: .5 });

    metricObserver.observe(metrics);
  }

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
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  function initForm() {
    const form = $('#enquiryForm');
    const status = $('#formStatus');

    if (!form || !status) return;

    form.addEventListener('submit', event => {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields with valid information.';
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

      window.open(
        `https://wa.me/918955179570?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener'
      );
    });
  }

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

  function init() {
    $('#year').textContent = String(new Date().getFullYear());

    initNavigation();
    initCarousel();
    initCountersAndReveals();
    initGallery();
    initForm();
    initScrollUI();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
