/* -------------------------------------------------------------
   BALRAM SIR TUITIONS - PREMIUM MODULAR INTERACTIVE SCRIPT
   ------------------------------------------------------------- */

(function () {
    'use strict';

    // Global application controller namespace
    const TuitionsApp = {
        init() {
            this.initScrollProgress();
            this.initStickyHeader();
            this.initMobileNavigation();
            this.initHeroSlider();
            this.initScrollReveal();
            this.initStatCounters();
            this.initAccordionFAQs();
            this.initFormValidation();
            this.initLightboxGallery();
            this.initImageFallbacks();
            this.initBackToTop();
        },

        // 1. SCROLL PROGRESS INDICATOR
        // Tracks user scroll heights and updates the top loading progress bar
        initScrollProgress() {
            const progressBar = document.getElementById('scrollIndicator');
            if (!progressBar) return;

            const updateProgressBar = () => {
                const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                if (totalHeight <= 0) return;
                const scrollPercent = (window.scrollY / totalHeight) * 100;
                progressBar.style.width = `${scrollPercent}%`;
            };

            window.addEventListener('scroll', updateProgressBar, { passive: true });
        },

        // 2. STICKY HEADER & SCROLL SHRINK
        // Shrinks header heights and tracks active sections to update navbar indicator links
        initStickyHeader() {
            const header = document.getElementById('header');
            const sections = document.querySelectorAll('section, footer');
            const navLinks = document.querySelectorAll('.nav-link');
            if (!header) return;

            const handleHeaderScroll = () => {
                // Header shrink trigger
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Navbar Active section intersection tracking
                let currentSectionId = '';
                sections.forEach((section) => {
                    const sectionTop = section.offsetTop - 140;
                    const sectionHeight = section.offsetHeight;
                    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                        currentSectionId = section.getAttribute('id');
                    }
                });

                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            };

            window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        },

        // 3. MOBILE HAMBURGER DRAWER & BODY SCROLL LOCK
        // Toggles mobile menu drawer, manages ARIA state, and locks body scrolling when active
        initMobileNavigation() {
            const menuToggle = document.getElementById('menuToggle');
            const navMenu = document.getElementById('navMenu');
            if (!menuToggle || !navMenu) return;

            const toggleMobileMenu = () => {
                const isActive = menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isActive);
                
                // Toggle Body scroll lock class to prevent background scroll shifts
                document.body.classList.toggle('menu-open', isActive);

                // CSS Burger Spans Transitions
                const spans = menuToggle.querySelectorAll('span');
                if (isActive) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            };

            const closeMobileMenu = () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            };

            menuToggle.addEventListener('click', toggleMobileMenu);

            // Close mobile navigation when drawer links are clicked
            navMenu.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', closeMobileMenu);
            });
        },

        // 4. HERO SLIDER (Exactly 3 Slides - Swipe, Keyboard, Hover Actions)
        initHeroSlider() {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dots .dot');
            const prevBtn = document.getElementById('sliderPrev');
            const nextBtn = document.getElementById('sliderNext');
            const heroSection = document.getElementById('hero');
            if (slides.length !== 3) return;

            let currentSlideIndex = 0;
            let autoCycleTimer = null;
            const autoCycleInterval = 6000; // 6 seconds

            const updateActiveSlide = (index) => {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                // Handle boundaries wrap
                if (index >= slides.length) {
                    currentSlideIndex = 0;
                } else if (index < 0) {
                    currentSlideIndex = slides.length - 1;
                } else {
                    currentSlideIndex = index;
                }

                slides[currentSlideIndex].classList.add('active');
                dots[currentSlideIndex].classList.add('active');
            };

            const startAutoplay = () => {
                stopAutoplay();
                autoCycleTimer = setInterval(() => {
                    updateActiveSlide(currentSlideIndex + 1);
                }, autoCycleInterval);
            };

            const stopAutoplay = () => {
                if (autoCycleTimer) clearInterval(autoCycleTimer);
            };

            // Arrow Controls
            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    updateActiveSlide(currentSlideIndex - 1);
                    startAutoplay();
                });
                nextBtn.addEventListener('click', () => {
                    updateActiveSlide(currentSlideIndex + 1);
                    startAutoplay();
                });
            }

            // Dot Selectors
            dots.forEach((dot, dotIdx) => {
                dot.addEventListener('click', () => {
                    updateActiveSlide(dotIdx);
                    startAutoplay();
                });
            });

            // Pause slide rotation on hover
            if (heroSection) {
                heroSection.addEventListener('mouseenter', stopAutoplay);
                heroSection.addEventListener('mouseleave', startAutoplay);

                // Touch Swipe Gestures
                let touchStartX = 0;
                let touchEndX = 0;

                heroSection.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                heroSection.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    evaluateSliderSwipe();
                }, { passive: true });

                const evaluateSliderSwipe = () => {
                    const swipeLimit = 50; // pixels
                    if (touchStartX - touchEndX > swipeLimit) {
                        // Swipe Left -> Next
                        updateActiveSlide(currentSlideIndex + 1);
                        startAutoplay();
                    } else if (touchEndX - touchStartX > swipeLimit) {
                        // Swipe Right -> Previous
                        updateActiveSlide(currentSlideIndex - 1);
                        startAutoplay();
                    }
                };
            }

            // Keyboard Arrows Controls
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    updateActiveSlide(currentSlideIndex - 1);
                    startAutoplay();
                } else if (e.key === 'ArrowRight') {
                    updateActiveSlide(currentSlideIndex + 1);
                    startAutoplay();
                }
            });

            // Trigger autoplay cycle
            startAutoplay();
        },

        // 5. SCROLL REVEAL OBSERVER
        // Staggers page section elements fade-ins using IntersectionObservers
        initScrollReveal() {
            const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            
            const revealCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target); // Unbind to optimize resources
                    }
                });
            };

            const revealObserver = new IntersectionObserver(revealCallback, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            revealElements.forEach(el => revealObserver.observe(el));
        },

        // 6. STATISTICS COUNTER
        // Animates highlights counter figures when elements scroll into active viewports
        initStatCounters() {
            const counterElements = document.querySelectorAll('.counter');
            
            const animateValue = (el) => {
                const targetVal = parseInt(el.getAttribute('data-target'), 10);
                const duration = 2200; // 2.2 seconds animation
                const updateStepTime = Math.max(Math.floor(duration / targetVal), 15);
                let currentVal = 0;

                const counterTimer = setInterval(() => {
                    currentVal += Math.ceil(targetVal / (duration / updateStepTime));
                    if (currentVal >= targetVal) {
                        el.textContent = targetVal;
                        clearInterval(counterTimer);
                    } else {
                        el.textContent = currentVal;
                    }
                }, updateStepTime);
            };

            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateValue(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            counterElements.forEach(counter => counterObserver.observe(counter));
        },

        // 7. ACCORDION FAQ CONTROLLER
        // Collapse other open panels, animates panel heights via scrollHeight bounds
        initAccordionFAQs() {
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach((item) => {
                const trigger = item.querySelector('.faq-trigger');
                const panel = item.querySelector('.faq-panel');
                if (!trigger || !panel) return;

                trigger.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');

                    // Collapse all open FAQ questions
                    faqItems.forEach((otherItem) => {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-panel').style.maxHeight = '0';
                    });

                    // Toggle selected FAQ question
                    if (!isActive) {
                        item.classList.add('active');
                        trigger.setAttribute('aria-expanded', 'true');
                        panel.style.maxHeight = `${panel.scrollHeight}px`;
                    }
                });
            });
        },

        // 8. ADMISSION FORM & VALIDATION LOGIC
        initFormValidation() {
            const enquiryForm = document.getElementById('enquiryForm');
            const successAlert = document.getElementById('successAlert');
            if (!enquiryForm) return;

            const fields = {
                studentName: document.getElementById('studentName'),
                parentName: document.getElementById('parentName'),
                mobileNumber: document.getElementById('mobileNumber'),
                board: document.getElementById('board'),
                studentClass: document.getElementById('studentClass'),
                subject: document.getElementById('subject'),
                batch: document.getElementById('batch'),
                time: document.getElementById('time')
            };

            const displayError = (fieldKey, msg) => {
                const errorSpan = document.getElementById(`${fieldKey}Error`);
                if (errorSpan) {
                    errorSpan.textContent = msg;
                }
                if (fields[fieldKey]) {
                    fields[fieldKey].style.borderColor = '#ef4444';
                    fields[fieldKey].classList.add('shake-error');
                    // Reset shake animation class after completion
                    setTimeout(() => {
                        fields[fieldKey].classList.remove('shake-error');
                    }, 400);
                }
            };

            const clearError = (fieldKey) => {
                const errorSpan = document.getElementById(`${fieldKey}Error`);
                if (errorSpan) {
                    errorSpan.textContent = '';
                }
                if (fields[fieldKey]) {
                    fields[fieldKey].style.borderColor = 'rgba(11,30,54,0.15)';
                }
            };

            // Bind live inputs listeners to instantly clear error styles on keypress
            Object.keys(fields).forEach((key) => {
                if (fields[key]) {
                    const listenerType = fields[key].tagName === 'SELECT' ? 'change' : 'input';
                    fields[key].addEventListener(listenerType, () => clearError(key));
                }
            });

            const validateAllFields = () => {
                let isValid = true;

                // Student Name Validation
                if (!fields.studentName.value.trim()) {
                    displayError('studentName', 'Student Name is required');
                    isValid = false;
                } else {
                    clearError('studentName');
                }

                // Parent Name Validation
                if (!fields.parentName.value.trim()) {
                    displayError('parentName', 'Parent Name is required');
                    isValid = false;
                } else {
                    clearError('parentName');
                }

                // Mobile Number Validation (Indian Mobile: Exactly 10 digits)
                const phoneStr = fields.mobileNumber.value.trim();
                const numericRegEx = /^[0-9]+$/;
                if (!phoneStr) {
                    displayError('mobileNumber', 'Mobile Number is required');
                    isValid = false;
                } else if (!numericRegEx.test(phoneStr)) {
                    displayError('mobileNumber', 'Only numeric digits allowed');
                    isValid = false;
                } else if (phoneStr.length !== 10) {
                    displayError('mobileNumber', 'Mobile numbers must be exactly 10 digits');
                    isValid = false;
                } else {
                    clearError('mobileNumber');
                }

                // Dropdowns Validations
                const dropdowns = ['board', 'studentClass', 'subject', 'batch', 'time'];
                dropdowns.forEach((key) => {
                    if (!fields[key].value) {
                        displayError(key, 'Please select a valid option');
                        isValid = false;
                    } else {
                        clearError(key);
                    }
                });

                return isValid;
            };

            enquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();

                if (!validateAllFields()) {
                    // Focus on the first invalid field
                    const firstInvalidKey = Object.keys(fields).find((key) => {
                        const errorLabel = document.getElementById(`${key}Error`);
                        return errorLabel && errorLabel.textContent !== '';
                    });
                    if (firstInvalidKey && fields[firstInvalidKey]) {
                        fields[firstInvalidKey].focus();
                    }
                    return;
                }

                // Capture form values
                const sName = fields.studentName.value.trim();
                const pName = fields.parentName.value.trim();
                const phone = fields.mobileNumber.value.trim();
                const emailVal = document.getElementById('email').value.trim() || 'Not Provided';
                const boardSelected = fields.board.value;
                const classSelected = fields.studentClass.value;
                const subjectSelected = fields.subject.value;
                const batchSelected = fields.batch.value;
                const timeSelected = fields.time.value;
                const messageVal = document.getElementById('message').value.trim() || 'No custom requirement message';

                // Display success overlay
                successAlert.classList.add('active');

                // Build formatted WhatsApp message logs
                const waMessageText = 
`*ADMISSION ENQUIRY*
*Balram Sir Tuitions*
==========================

*Student Details:*
• Name: ${sName}
• Class: ${classSelected}
• Board: ${boardSelected}
• Primary Subject: ${subjectSelected}

*Parent Details:*
• Parent Name: ${pName}
• Mobile Number: +91 ${phone}
• Email: ${emailVal}

*Preferences:*
• Preferred Batch: ${batchSelected}
• Time Slot: ${timeSelected}

*Message / Learning Goals:*
"${messageVal}"

==========================
Please schedule my trial demo sessions. Thank you!`;

                const encodedText = encodeURIComponent(waMessageText);
                // Target WhatsApp Redirect: +91 8955179570 (Sanitized destination number format: 918955179570)
                const waRedirectURL = `https://wa.me/918955179570?text=${encodedText}`;

                // Delay redirects to allow modal success animation triggers
                setTimeout(() => {
                    window.open(waRedirectURL, '_blank');
                    enquiryForm.reset();
                    successAlert.classList.remove('active');
                }, 1800);
            });
        },

        // 9. THREE-IMAGE GALLERY LIGHTBOX PREVIEW
        // Handles click zooms, image arrows, and closing of modal layers
        initLightboxGallery() {
            const galleryItems = document.querySelectorAll('.gallery-item-three');
            const lightbox = document.getElementById('lightboxOverlay');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxCaption = document.getElementById('lightboxCaption');
            const closeBtn = document.getElementById('lightboxClose');
            const prevBtn = document.getElementById('lightboxPrev');
            const nextBtn = document.getElementById('lightboxNext');
            if (galleryItems.length === 0 || !lightbox || !lightboxImg) return;

            let currentImgIndex = 0;
            const imagesData = [];

            // Extract src and subtitle data from gallery DOM elements
            galleryItems.forEach((item, index) => {
                const img = item.querySelector('.gallery-img');
                const captionText = item.querySelector('.gallery-overlay h4')?.textContent || '';
                
                if (img) {
                    imagesData.push({
                        src: img.getAttribute('src'),
                        caption: captionText
                    });
                }

                item.addEventListener('click', () => {
                    openLightbox(index);
                });
            });

            const openLightbox = (index) => {
                currentImgIndex = index;
                lightboxImg.setAttribute('src', imagesData[currentImgIndex].src);
                lightboxCaption.textContent = imagesData[currentImgIndex].caption;
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('menu-open'); // Prevent page scroll shifts
            };

            const closeLightbox = () => {
                lightbox.classList.remove('active');
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('menu-open');
            };

            const showPrevImage = () => {
                currentImgIndex = currentImgIndex === 0 ? imagesData.length - 1 : currentImgIndex - 1;
                lightboxImg.setAttribute('src', imagesData[currentImgIndex].src);
                lightboxCaption.textContent = imagesData[currentImgIndex].caption;
            };

            const showNextImage = () => {
                currentImgIndex = currentImgIndex === imagesData.length - 1 ? 0 : currentImgIndex + 1;
                lightboxImg.setAttribute('src', imagesData[currentImgIndex].src);
                lightboxCaption.textContent = imagesData[currentImgIndex].caption;
            };

            if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
            if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
            if (nextBtn) nextBtn.addEventListener('click', showNextImage);

            // Close lightbox modal on clicking background overlay
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Keyboard navigation controls
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') closeLightbox();
                    else if (e.key === 'ArrowLeft') showPrevImage();
                    else if (e.key === 'ArrowRight') showNextImage();
                }
            });
        },

        // 10. IMAGE LOAD ERROR FALLBACKS
        // Dynamically replaces broken paths with stylish gradients and text overrides
        initImageFallbacks() {
            const processBrokenImg = (img) => {
                const parent = img.parentElement;
                if (!parent) return;

                parent.style.background = 'linear-gradient(135deg, #0b1e36 0%, #1e40af 100%)';
                parent.style.position = 'relative';

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
                img.style.display = 'none'; // Safely hide standard browser broken image icons
            };

            document.querySelectorAll('img').forEach((img) => {
                img.addEventListener('error', () => processBrokenImg(img));
                if (img.complete && img.naturalWidth === 0) {
                    processBrokenImg(img);
                }
            });
        },

        // 11. FLOATING ACTION CONTROLS
        // Handles scrolling thresholds for back-to-top and floating calls buttons visibility
        initBackToTop() {
            const backToTopBtn = document.getElementById('backToTop');
            const floatingCall = document.getElementById('floatingCall');
            if (!backToTopBtn) return;

            const handleFloatingVisibility = () => {
                if (window.scrollY > 450) {
                    backToTopBtn.classList.add('visible');
                    if (floatingCall) floatingCall.style.transform = 'scale(1)';
                } else {
                    backToTopBtn.classList.remove('visible');
                    // Hide call helper at the top scroll section (keeps layout cleaner)
                    if (floatingCall && window.innerWidth < 480) {
                        floatingCall.style.transform = 'scale(0)';
                    }
                }
            };

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            window.addEventListener('scroll', handleFloatingVisibility, { passive: true });
        }
    };

    // Launch application namespace logic
    TuitionsApp.init();

})();
