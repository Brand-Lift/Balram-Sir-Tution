/**
 * Balram Sir Tuitions - Website Logic Engine
 * Handcrafted Vanilla Javascript for Production Quality & Seamless User Experience
 * Features: Sticky Header, Mobile Navigation drawer, Slide Controllers, Counters,
 * Accordeons, Lightbox gallery preview, Form check validation & formatted WhatsApp redirection.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 1. INLINE MODULES REGISTRY & STATE MANAGER
    const state = {
        currentSlide: 0,
        slideInterval: null,
        slideDuration: 5500, // 5.5 Seconds Autoplay Duration
        countersStarted: false,
        activeGalleryIdx: 0,
        galleryImages: [
            {
                src: 'TUITION_IMAGE_1',
                caption: 'Modern Smart Classroom - Equipped with projector boards and conceptual learning aids.'
            },
            {
                src: 'TUITION_IMAGE_2',
                caption: 'Fully Stocked Reference Reading Library - Quiet area for board study preparations.'
            },
            {
                src: 'TUITION_IMAGE_3',
                caption: 'Interactive Doubt Clearing Sessions - Personal attention from senior mentors.'
            }
        ]
    };

    // DOM Cache Elements
    const elements = {
        header: document.getElementById('header'),
        scrollIndicator: document.getElementById('scrollIndicator'),
        menuToggle: document.getElementById('menuToggle'),
        navMenu: document.getElementById('navMenu'),
        navLinks: document.querySelectorAll('.nav-link'),
        slides: document.querySelectorAll('.slide'),
        dots: document.querySelectorAll('.slider-dots .dot'),
        prevBtn: document.getElementById('sliderPrev'),
        nextBtn: document.getElementById('sliderNext'),
        counters: document.querySelectorAll('.counter'),
        faqItems: document.querySelectorAll('.faq-item'),
        lightboxOverlay: document.getElementById('lightboxOverlay'),
        lightboxImg: document.getElementById('lightboxImg'),
        lightboxCaption: document.getElementById('lightboxCaption'),
        lightboxClose: document.getElementById('lightboxClose'),
        lightboxPrev: document.getElementById('lightboxPrev'),
        lightboxNext: document.getElementById('lightboxNext'),
        galleryItems: document.querySelectorAll('.gallery-item-three'),
        enquiryForm: document.getElementById('enquiryForm'),
        successAlert: document.getElementById('successAlert'),
        backToTop: document.getElementById('backToTop'),
        floatingCall: document.getElementById('floatingCall'),
        floatingWhatsapp: document.getElementById('floatingWhatsapp')
    };

    // 2. SYSTEM INITS AND SCROLL HANDLERS
    const initApp = () => {
        setupScrollTrackers();
        setupMobileNavigation();
        setupHeroSlider();
        setupCountObserver();
        setupFaqAccordion();
        setupLightboxGallery();
        setupFormValidation();
        setupBackToTop();
        initImageFallbacks();
    };

    // Scroll progress line bar and sticky transparent header scrolled modifier
    const setupScrollTrackers = () => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            
            // Set scroll bar width
            if (elements.scrollIndicator) {
                elements.scrollIndicator.style.width = `${scrollPercent}%`;
            }

            // Scrolled sticky bar header class toggle
            if (elements.header) {
                if (scrollTop > 50) {
                    elements.header.classList.add('scrolled');
                } else {
                    elements.header.classList.remove('scrolled');
                }
            }

            // Highlighting active section nav links
            highlightActiveSection();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger initially
    };

    // Dynamic Navigation links intersection highlighter
    const highlightActiveSection = () => {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPos = (window.scrollY || document.documentElement.scrollTop) + 120;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const targetId = section.getAttribute('id');
                elements.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${targetId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    // 3. MOBILE MENU HAMBURGER DRAWER
    const setupMobileNavigation = () => {
        if (!elements.menuToggle || !elements.navMenu) return;

        const toggleMenu = (e) => {
            e.stopPropagation();
            const isOpen = elements.navMenu.classList.contains('active');
            
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        const openMenu = () => {
            elements.navMenu.classList.add('active');
            elements.menuToggle.classList.add('active');
            elements.menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        };

        const closeMenu = () => {
            elements.navMenu.classList.remove('active');
            elements.menuToggle.classList.remove('active');
            elements.menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Unlock background scroll
        };

        elements.menuToggle.addEventListener('click', toggleMenu);

        // Close when clicking nav links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking outside menu drawer
        document.addEventListener('click', (e) => {
            if (elements.navMenu.classList.contains('active') && 
                !elements.navMenu.contains(e.target) && 
                !elements.menuToggle.contains(e.target)) {
                closeMenu();
            }
        });
    };

    // 4. PREMIUM HERO SLIDER AUTOMATED/MANUAL CONTROLS
    const setupHeroSlider = () => {
        if (elements.slides.length === 0) return;

        const showSlide = (idx) => {
            elements.slides.forEach(slide => slide.classList.remove('active'));
            elements.dots.forEach(dot => dot.classList.remove('active'));
            
            // Handle Index boundaries
            let targetIdx = idx;
            if (idx >= elements.slides.length) targetIdx = 0;
            if (idx < 0) targetIdx = elements.slides.length - 1;
            
            state.currentSlide = targetIdx;
            elements.slides[targetIdx].classList.add('active');
            if (elements.dots[targetIdx]) {
                elements.dots[targetIdx].classList.add('active');
            }
        };

        const nextSlide = () => showSlide(state.currentSlide + 1);
        const prevSlide = () => showSlide(state.currentSlide - 1);

        const startAutoplay = () => {
            stopAutoplay();
            state.slideInterval = setInterval(nextSlide, state.slideDuration);
        };

        const stopAutoplay = () => {
            if (state.slideInterval) {
                clearInterval(state.slideInterval);
            }
        };

        // Listeners for manual triggers
        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoplay();
            });
        }

        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoplay();
            });
        }

        // Dot Navigation links
        elements.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                startAutoplay();
            });
        });

        // Autoplay pause on mouse hover
        const sliderSection = document.getElementById('hero');
        if (sliderSection) {
            sliderSection.addEventListener('mouseenter', stopAutoplay);
            sliderSection.addEventListener('mouseleave', startAutoplay);
        }

        // Swipe Gestures Support for mobile users
        let startX = 0;
        let endX = 0;
        
        if (sliderSection) {
            sliderSection.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
            }, { passive: true });

            sliderSection.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].screenX;
                const swipeThreshold = 50;
                
                if (startX - endX > swipeThreshold) {
                    nextSlide(); // Swipe Left (Next)
                    startAutoplay();
                } else if (endX - startX > swipeThreshold) {
                    prevSlide(); // Swipe Right (Prev)
                    startAutoplay();
                }
            }, { passive: true });
        }

        // Initialize Slider Cycle
        showSlide(0);
        startAutoplay();
    };

    // 5. INTERSECTION OBSERVER FOR COUNT-UP NUMBERS
    const setupCountObserver = () => {
        if (elements.counters.length === 0) return;

        const countUp = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const duration = 2000; // 2 seconds animation duration
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;
            
            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = current;
                }
            }, stepTime);
        };

        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !state.countersStarted) {
                    elements.counters.forEach(counter => countUp(counter));
                    state.countersStarted = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const highlightsSection = document.getElementById('highlights');
        if (highlightsSection) {
            counterObserver.observe(highlightsSection);
        }

        // Animation reveal triggers for blocks
        const revealBlocks = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

        revealBlocks.forEach(block => revealObserver.observe(block));
    };

    // 6. COLLAPSIBLE ACCORDION PANELS
    const setupFaqAccordion = () => {
        elements.faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            const panel = item.querySelector('.faq-panel');
            
            if (!trigger || !panel) return;

            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close other accordion panels
                elements.faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    const otherPanel = otherItem.querySelector('.faq-panel');
                    if (otherPanel) otherPanel.style.maxHeight = null;
                    if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                });

                if (!isActive) {
                    item.classList.add('active');
                    trigger.setAttribute('aria-expanded', 'true');
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                } else {
                    item.classList.remove('active');
                    trigger.setAttribute('aria-expanded', 'false');
                    panel.style.maxHeight = null;
                }
            });
        });
    };

    // 7. LIGHTBOX GALLERY PREVIEW MODAL
    const setupLightboxGallery = () => {
        if (!elements.lightboxOverlay || elements.galleryItems.length === 0) return;

        const openLightbox = (idx) => {
            state.activeGalleryIdx = idx;
            const targetImg = state.galleryImages[idx];
            
            if (!targetImg) return;

            if (elements.lightboxImg) {
                elements.lightboxImg.src = targetImg.src;
                // Add fallback listener to lightbox image as well
                elements.lightboxImg.onerror = () => {
                    elements.lightboxImg.src = '';
                    elements.lightboxImg.style.display = 'none';
                    if (elements.lightboxCaption) {
                        elements.lightboxCaption.textContent = targetImg.caption + ' (Demo Asset)';
                    }
                };
                elements.lightboxImg.style.display = 'block';
            }
            if (elements.lightboxCaption) {
                elements.lightboxCaption.textContent = targetImg.caption;
            }
            
            elements.lightboxOverlay.classList.add('active');
            elements.lightboxOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            elements.lightboxOverlay.classList.remove('active');
            elements.lightboxOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        const navNextImg = () => {
            let nextIdx = state.activeGalleryIdx + 1;
            if (nextIdx >= state.galleryImages.length) nextIdx = 0;
            openLightbox(nextIdx);
        };

        const navPrevImg = () => {
            let prevIdx = state.activeGalleryIdx - 1;
            if (prevIdx < 0) prevIdx = state.galleryImages.length - 1;
            openLightbox(prevIdx);
        };

        // Attach click listeners to gallery elements
        elements.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        // Controls
        if (elements.lightboxClose) {
            elements.lightboxClose.addEventListener('click', closeLightbox);
        }

        if (elements.lightboxNext) {
            elements.lightboxNext.addEventListener('click', navNextImg);
        }

        if (elements.lightboxPrev) {
            elements.lightboxPrev.addEventListener('click', navPrevImg);
        }

        // Close on clicking outside lightbox container
        elements.lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === elements.lightboxOverlay) {
                closeLightbox();
            }
        });

        // Keyboard navigation (Esc, Arrows)
        document.addEventListener('keydown', (e) => {
            if (!elements.lightboxOverlay.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') navNextImg();
            if (e.key === 'ArrowLeft') navPrevImg();
        });
    };

    // 8. INPUT VALIDATION & WHATSAPP REDIRECTION LINK BUILDER
    const setupFormValidation = () => {
        if (!elements.enquiryForm) return;

        const inputs = {
            studentName: document.getElementById('studentName'),
            parentName: document.getElementById('parentName'),
            mobileNumber: document.getElementById('mobileNumber'),
            email: document.getElementById('email'),
            board: document.getElementById('board'),
            studentClass: document.getElementById('studentClass'),
            subject: document.getElementById('subject'),
            batch: document.getElementById('batch'),
            time: document.getElementById('time'),
            message: document.getElementById('message')
        };

        const errorSpans = {
            studentName: document.getElementById('studentNameError'),
            parentName: document.getElementById('parentNameError'),
            mobileNumber: document.getElementById('mobileNumberError'),
            email: document.getElementById('emailError'),
            board: document.getElementById('boardError'),
            studentClass: document.getElementById('classError'),
            subject: document.getElementById('subjectError'),
            batch: document.getElementById('batchError'),
            time: document.getElementById('timeError')
        };

        // Real-time validation helper
        const validateInput = (id, field, errorSpan, regex, emptyMsg, formatMsg) => {
            const val = field.value.trim();
            if (!val) {
                errorSpan.textContent = emptyMsg;
                field.classList.add('input-invalid');
                return false;
            }
            if (regex && !regex.test(val)) {
                errorSpan.textContent = formatMsg;
                field.classList.add('input-invalid');
                return false;
            }
            errorSpan.textContent = '';
            field.classList.remove('input-invalid');
            return true;
        };

        // Attach input event listeners for real-time error clearing
        Object.keys(inputs).forEach(key => {
            const field = inputs[key];
            const span = errorSpans[key];
            if (field && span) {
                field.addEventListener('input', () => {
                    field.classList.remove('input-invalid');
                    span.textContent = '';
                });
            }
        });

        const checkFormValidity = () => {
            let isValid = true;

            // Name checks
            if (!validateInput('studentName', inputs.studentName, errorSpans.studentName, /^[A-Za-z\s]{3,40}$/, 'Student Name is required', 'Please enter a valid alphabetic name (min 3 characters)')) isValid = false;
            if (!validateInput('parentName', inputs.parentName, errorSpans.parentName, /^[A-Za-z\s]{3,40}$/, 'Parent Name is required', 'Please enter a valid alphabetic name (min 3 characters)')) isValid = false;

            // Mobile check (exactly 10 digits)
            if (!validateInput('mobileNumber', inputs.mobileNumber, errorSpans.mobileNumber, /^[6-9]\d{9}$/, 'Mobile Number is required', 'Please enter a valid 10-digit mobile number starting with 6-9')) isValid = false;

            // Optional email check
            if (inputs.email.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!validateInput('email', inputs.email, errorSpans.email, emailRegex, '', 'Please enter a valid email address')) isValid = false;
            }

            // Dropdown checks
            if (inputs.board.value === '') {
                errorSpans.board.textContent = 'Please select a board';
                inputs.board.classList.add('input-invalid');
                isValid = false;
            } else {
                errorSpans.board.textContent = '';
                inputs.board.classList.remove('input-invalid');
            }

            if (inputs.studentClass.value === '') {
                errorSpans.studentClass.textContent = 'Please select a class';
                inputs.studentClass.classList.add('input-invalid');
                isValid = false;
            } else {
                errorSpans.studentClass.textContent = '';
                inputs.studentClass.classList.remove('input-invalid');
            }

            if (inputs.subject.value === '') {
                errorSpans.subject.textContent = 'Please select a subject';
                inputs.subject.classList.add('input-invalid');
                isValid = false;
            } else {
                errorSpans.subject.textContent = '';
                inputs.subject.classList.remove('input-invalid');
            }

            if (inputs.batch.value === '') {
                errorSpans.batch.textContent = 'Please select a batch';
                inputs.batch.classList.add('input-invalid');
                isValid = false;
            } else {
                errorSpans.batch.textContent = '';
                inputs.batch.classList.remove('input-invalid');
            }

            if (inputs.time.value === '') {
                errorSpans.time.textContent = 'Please select a preferred slot';
                inputs.time.classList.add('input-invalid');
                isValid = false;
            } else {
                errorSpans.time.textContent = '';
                inputs.time.classList.remove('input-invalid');
            }

            return isValid;
        };

        elements.enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!checkFormValidity()) {
                // Shake validation error feedback
                elements.enquiryForm.classList.add('shake-error');
                setTimeout(() => {
                    elements.enquiryForm.classList.remove('shake-error');
                }, 400);
                return;
            }

            // Process valid form
            if (elements.successAlert) {
                elements.successAlert.classList.add('active');
            }

            // Format WhatsApp Message Content
            const formattedMsg = `Hello Balram Sir Tuitions, I would like to enquire about taking admission. Here are my details:
- *Student Name*: ${inputs.studentName.value.trim()}
- *Parent Name*: ${inputs.parentName.value.trim()}
- *Mobile*: ${inputs.mobileNumber.value.trim()}
- *Email*: ${inputs.email.value.trim() || 'Not Provided'}
- *Board*: ${inputs.board.value}
- *Class*: ${inputs.studentClass.value}
- *Subject*: ${inputs.subject.value}
- *Preferred Batch*: ${inputs.batch.value}
- *Timings*: ${inputs.time.value}
- *Goals/Message*: ${inputs.message.value.trim() || 'Standard Trial Registration'}`;

            const waLink = `https://wa.me/918955179570?text=${encodeURIComponent(formattedMsg)}`;

            setTimeout(() => {
                if (elements.successAlert) {
                    elements.successAlert.classList.remove('active');
                }
                // Redirect user to WhatsApp page
                window.open(waLink, '_blank');
            }, 1800);
        });
    };

    // 9. DYNAMIC FLOATING ACTIONS SCROLL TRIGGERS (Back To Top, Whatsapp hides)
    const setupBackToTop = () => {
        if (!elements.backToTop) return;

        const toggleFloaterVisibility = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            
            // Display elements after 350px scroll height
            if (scrollTop > 350) {
                elements.backToTop.classList.add('visible');
            } else {
                elements.backToTop.classList.remove('visible');
            }
        };

        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleFloaterVisibility, { passive: true });
        toggleFloaterVisibility(); // Initial check
    };

    // 10. IMAGE LOAD ERROR FALLBACKS
    // Catches missing directories and renders clean CSS gradients with overlays
    const initImageFallbacks = () => {
        const processBrokenImg = (img) => {
            const parent = img.parentElement;
            if (!parent) return;

            parent.style.background = 'linear-gradient(135deg, #0a192f 0%, #004ecc 100%)';
            // Safely assign relative position to parent only if its computed position is static
            if (window.getComputedStyle(parent).position === 'static') {
                parent.style.position = 'relative';
            }

            // Prevent layout shifts during loading
            if (img.classList.contains('slide-img')) {
                parent.style.minHeight = '100vh';
            }

            // Append styled overlay text
            const textOverlay = document.createElement('div');
            textOverlay.style.position = 'absolute';
            textOverlay.style.top = '50%';
            textOverlay.style.left = '50%';
            textOverlay.style.transform = 'translate(-50%, -50%)';
            textOverlay.style.color = 'rgba(255, 255, 255, 0.12)';
            textOverlay.style.fontSize = 'clamp(2.5rem, 5.5vw, 4.5rem)';
            textOverlay.style.fontWeight = '800';
            textOverlay.style.fontFamily = "'Outfit', sans-serif";
            textOverlay.style.textTransform = 'uppercase';
            textOverlay.style.letterSpacing = '3px';
            textOverlay.style.pointerEvents = 'none';

            if (img.classList.contains('slide-img')) {
                textOverlay.textContent = 'Balram Sir Tuitions';
            } else if (img.classList.contains('faculty-img')) {
                textOverlay.textContent = 'Mentor Profile';
            } else {
                textOverlay.textContent = 'Academic Excellence';
            }

            parent.appendChild(textOverlay);
            img.style.display = 'none';
        };

        // Select all images inside project sections
        const allImages = document.querySelectorAll('img');

        allImages.forEach(img => {
            // If already complete and broken
            if (img.complete && img.naturalWidth === 0) {
                processBrokenImg(img);
            } else {
                // Listen to error fires
                img.addEventListener('error', () => {
                    processBrokenImg(img);
                });
            }
        });
    };

    // Execute System Init
    initApp();
});
