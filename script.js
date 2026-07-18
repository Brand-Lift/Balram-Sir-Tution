/* -------------------------------------------------------------
   BALRAM SIR TUITIONS - REWRITTEN INTERACTIVE SCRIPT
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. ROBUST IMAGE ERROR HANDLER
    // Dynamically captures missing placeholders and replaces them with premium CSS gradients
    const handleImgFallback = (img) => {
        const parent = img.parentElement;
        if (parent) {
            parent.style.background = 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)';
            parent.style.position = 'relative';
            
            // Retain layout aspect ratios correctly
            if (img.classList.contains('slide-img')) {
                parent.style.minHeight = '100vh';
            }
            
            // Inject beautiful decorative text block dynamically
            const decorativeText = document.createElement('div');
            decorativeText.style.position = 'absolute';
            decorativeText.style.top = '50%';
            decorativeText.style.left = '50%';
            decorativeText.style.transform = 'translate(-50%, -50%)';
            decorativeText.style.color = 'rgba(255, 255, 255, 0.12)';
            decorativeText.style.fontSize = 'clamp(2.5rem, 6vw, 4.5rem)';
            decorativeText.style.fontWeight = '800';
            decorativeText.style.fontFamily = "'Outfit', sans-serif";
            decorativeText.style.textTransform = 'uppercase';
            decorativeText.style.letterSpacing = '4px';
            decorativeText.style.pointerEvents = 'none';
            
            // Map text details based on image classes
            if (img.classList.contains('slide-img')) {
                decorativeText.textContent = 'Balram Sir Tuitions';
            } else if (img.classList.contains('faculty-img')) {
                decorativeText.textContent = 'Mentor Profile';
            } else {
                decorativeText.textContent = 'Academic Excellence';
            }
            
            parent.appendChild(decorativeText);
        }
        img.style.display = 'none'; // Safely hide broken image block
    };

    // Bind error listeners to all image tags
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => handleImgFallback(img));
        
        // Handle images that might have errored before initial binding script loads
        if (img.complete && img.naturalWidth === 0) {
            handleImgFallback(img);
        }
    });

    // 2. STICKY HEADER & NAV ACTIVE LINKS INDICATOR
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');

    const handleWindowScroll = () => {
        // Sticky Header toggles
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility threshold
        if (window.scrollY > 450) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Intersection link checking
        let currentActiveSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // 3. MOBILE HAMBURGER MENU DRAWER
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !expanded);
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Handle burger spans transformation
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile drawer on navigation click
        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach((span) => span.style.transform = 'none');
                menuToggle.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // 4. CINEMATIC HERO SLIDER (Exactly 3 Slides)
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlideIndex = 0;
    let sliderCycleTimer = null;
    const slideDuration = 6000; // 6 seconds

    const renderSlide = (index) => {
        slides.forEach((slide) => slide.classList.remove('active'));
        dots.forEach((dot) => dot.classList.remove('active'));

        // Handle boundaries cycle
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    };

    const activateSliderTimer = () => {
        deactivateSliderTimer();
        sliderCycleTimer = setInterval(() => {
            renderSlide(currentSlideIndex + 1);
        }, slideDuration);
    };

    const deactivateSliderTimer = () => {
        if (sliderCycleTimer) clearInterval(sliderCycleTimer);
    };

    // Button controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            renderSlide(currentSlideIndex - 1);
            activateSliderTimer();
        });
        nextBtn.addEventListener('click', () => {
            renderSlide(currentSlideIndex + 1);
            activateSliderTimer();
        });
    }

    // Dot paginations
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            renderSlide(idx);
            activateSliderTimer();
        });
    });

    // Pause slider cycle on mouse hover
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', deactivateSliderTimer);
        heroSection.addEventListener('mouseleave', activateSliderTimer);

        // Touch Swipe Gestures
        let touchStartXCoord = 0;
        let touchEndXCoord = 0;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartXCoord = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener('touchend', (e) => {
            touchEndXCoord = e.changedTouches[0].screenX;
            evaluateTouchSwipe();
        }, { passive: true });

        const evaluateTouchSwipe = () => {
            const swipeDistanceLimit = 50; // pixels
            if (touchStartXCoord - touchEndXCoord > swipeDistanceLimit) {
                // Swipe Left -> Next
                renderSlide(currentSlideIndex + 1);
                activateSliderTimer();
            } else if (touchEndXCoord - touchStartXCoord > swipeDistanceLimit) {
                // Swipe Right -> Previous
                renderSlide(currentSlideIndex - 1);
                activateSliderTimer();
            }
        };
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            renderSlide(currentSlideIndex - 1);
            activateSliderTimer();
        } else if (e.key === 'ArrowRight') {
            renderSlide(currentSlideIndex + 1);
            activateSliderTimer();
        }
    });

    // Init slider timer cycle
    activateSliderTimer();

    // 5. SCROLL ENTRY REVEALS OBSERVER
    const revealTargets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const scrollRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                scrollRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach((target) => scrollRevealObserver.observe(target));

    // 6. METRICS COUNT-UP STATS
    const counters = document.querySelectorAll('.counter');
    const animateStat = (el) => {
        const targetValue = parseInt(el.getAttribute('data-target'), 10);
        const animationTime = 2000; // 2 seconds
        const stepRate = Math.max(Math.floor(animationTime / targetValue), 12);
        let count = 0;

        const timer = setInterval(() => {
            count += Math.ceil(targetValue / (animationTime / stepRate));
            if (count >= targetValue) {
                el.textContent = targetValue;
                clearInterval(timer);
            } else {
                el.textContent = count;
            }
        }, stepRate);
    };

    const countersObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                countersObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach((counter) => countersObserver.observe(counter));

    // 7. FAQ ACCORDION - COLLAPSE OTHERS LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        trigger.addEventListener('click', () => {
            const isCurrentlyActive = item.classList.contains('active');

            // Close all open sections
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.faq-panel').style.maxHeight = '0';
            });

            // If not active before, toggle active state
            if (!isCurrentlyActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });

    // 8. ADMISSION FORM INLINE VALS & REDIRECTION
    const enquiryForm = document.getElementById('enquiryForm');
    const successAlert = document.getElementById('successAlert');

    const formFields = {
        studentName: document.getElementById('studentName'),
        parentName: document.getElementById('parentName'),
        mobileNumber: document.getElementById('mobileNumber'),
        board: document.getElementById('board'),
        studentClass: document.getElementById('studentClass'),
        subject: document.getElementById('subject'),
        batch: document.getElementById('batch'),
        time: document.getElementById('time')
    };

    const displayFieldError = (fieldKey, msg) => {
        const errorLabel = document.getElementById(`${fieldKey}Error`);
        if (errorLabel) {
            errorLabel.textContent = msg;
        }
        if (formFields[fieldKey]) {
            formFields[fieldKey].style.borderColor = '#e53e3e';
            formFields[fieldKey].style.boxShadow = '0 0 0 2px rgba(229, 62, 62, 0.1)';
        }
    };

    const clearFieldError = (fieldKey) => {
        const errorLabel = document.getElementById(`${fieldKey}Error`);
        if (errorLabel) {
            errorLabel.textContent = '';
        }
        if (formFields[fieldKey]) {
            formFields[fieldKey].style.borderColor = 'rgba(0,0,0,0.15)';
            formFields[fieldKey].style.boxShadow = 'none';
        }
    };

    // Bind real-time change events to clear input styles
    Object.keys(formFields).forEach((key) => {
        if (formFields[key]) {
            const eventType = formFields[key].tagName === 'SELECT' ? 'change' : 'input';
            formFields[key].addEventListener(eventType, () => clearFieldError(key));
        }
    });

    const performValidation = () => {
        let isSuccess = true;

        // Student Name
        if (!formFields.studentName.value.trim()) {
            displayFieldError('studentName', 'Student Name is required');
            isSuccess = false;
        } else {
            clearFieldError('studentName');
        }

        // Parent Name
        if (!formFields.parentName.value.trim()) {
            displayFieldError('parentName', 'Parent Name is required');
            isSuccess = false;
        } else {
            clearFieldError('parentName');
        }

        // Mobile Number (Exactly 10 digits numeric)
        const mobileText = formFields.mobileNumber.value.trim();
        const numericPattern = /^[0-9]+$/;
        if (!mobileText) {
            displayFieldError('mobileNumber', 'Mobile Number is required');
            isSuccess = false;
        } else if (!numericPattern.test(mobileText)) {
            displayFieldError('mobileNumber', 'Only numeric digits are allowed');
            isSuccess = false;
        } else if (mobileText.length !== 10) {
            displayFieldError('mobileNumber', 'Mobile number must be exactly 10 digits');
            isSuccess = false;
        } else {
            clearFieldError('mobileNumber');
        }

        // Dropdowns checks
        const dropdownKeys = ['board', 'studentClass', 'subject', 'batch', 'time'];
        dropdownKeys.forEach((key) => {
            if (!formFields[key].value) {
                displayFieldError(key, 'Please select a valid option');
                isSuccess = false;
            } else {
                clearFieldError(key);
            }
        });

        return isSuccess;
    };

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!performValidation()) {
                // Focus first invalid element automatically
                const invalidKey = Object.keys(formFields).find((key) => {
                    const err = document.getElementById(`${key}Error`);
                    return err && err.textContent !== '';
                });
                if (invalidKey && formFields[invalidKey]) {
                    formFields[invalidKey].focus();
                }
                return;
            }

            // Gather values
            const nameStudent = formFields.studentName.value.trim();
            const nameParent = formFields.parentName.value.trim();
            const phoneVal = formFields.mobileNumber.value.trim();
            const mailVal = document.getElementById('email').value.trim() || 'Not Provided';
            const boardVal = formFields.board.value;
            const classVal = formFields.studentClass.value;
            const subjectVal = formFields.subject.value;
            const batchVal = formFields.batch.value;
            const timeVal = formFields.time.value;
            const msgVal = document.getElementById('message').value.trim() || 'No custom requirements';

            // Show success modal overlay
            successAlert.classList.add('active');

            // Format WhatsApp Message details
            const messageTemplate = 
`*ADMISSION ENQUIRY*
*Balram Sir Tuitions*
==========================

*Student Information:*
• Student Name: ${nameStudent}
• Class: ${classVal}
• Board: ${boardVal}
• Subject: ${subjectVal}

*Parent Information:*
• Parent Name: ${nameParent}
• Mobile Number: +91 ${phoneVal}
• Email: ${mailVal}

*Academic Preferences:*
• Batch Option: ${batchVal}
• Time Slot: ${timeVal}

*Custom Message:*
"${msgVal}"

==========================
Please schedule my trial demo sessions. Thank you!`;

            const encodedQuery = encodeURIComponent(messageTemplate);
            // Helpline target whatsapp redirects: +91 8955179570 (Cleaned recipient: 918955179570)
            const targetUrl = `https://wa.me/918955179570?text=${encodedQuery}`;

            setTimeout(() => {
                window.open(targetUrl, '_blank');
                enquiryForm.reset();
                successAlert.classList.remove('active');
            }, 1800);
        });
    }

    // 9. BACK TO TOP SCROLL ACTION
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
