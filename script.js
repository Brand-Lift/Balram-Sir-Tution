/* -------------------------------------------------------------
   BALRAM SIR TUITIONS - MODULAR INTERACTIVITY LOGIC
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. IMAGE FALLBACK LOGIC
    // Automatically replaces broken placeholders with beautiful gradients
    const handleImageError = (img) => {
        const parent = img.parentElement;
        if (parent) {
            // Apply beautiful premium background gradient fallback directly on container
            parent.style.background = 'linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%)';
            parent.style.position = 'relative';
            
            // If image is a slide, ensure layout spacing remains correct
            if (img.classList.contains('slide-img')) {
                parent.style.minHeight = '100vh';
            }
            
            // Add decorative texture dynamically
            const decorativeLine = document.createElement('div');
            decorativeLine.style.position = 'absolute';
            decorativeLine.style.top = '50%';
            decorativeLine.style.left = '50%';
            decorativeLine.style.transform = 'translate(-50%, -50%)';
            decorativeLine.style.color = 'rgba(255,255,255,0.15)';
            decorativeLine.style.fontSize = '4.5rem';
            decorativeLine.style.fontWeight = '800';
            decorativeLine.style.fontFamily = "'Outfit', sans-serif";
            decorativeLine.textContent = 'BALRAM SIR';
            parent.appendChild(decorativeLine);
        }
        img.style.display = 'none'; // Hide the broken image icon safely
    };

    // Bind error handlers to all existing images
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', () => handleImageError(img));
        
        // Handle images that might have already errored before DOMContentLoaded finishes
        if (img.complete && img.naturalWidth === 0) {
            handleImageError(img);
        }
    });

    // 2. STICKY HEADER & ACTIVE INDICATORS
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleScroll = () => {
        // Sticky Header scroll classes
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility threshold
        const backToTopBtn = document.getElementById('backToTop');
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active page section tracking
        let currentSectionId = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
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

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. MOBILE BURGER NAVIGATION MENU
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger layout
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click (mobile views)
        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                menuToggle.querySelectorAll('span').forEach((span) => span.style.transform = 'none');
                menuToggle.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // 4. HERO SLIDER LOGIC (Exactly 3 Slides)
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let activeSlideIndex = 0;
    let slideTimer = null;
    const autoPlayDelay = 6000; // 6 seconds auto cycle

    const showSlide = (index) => {
        slides.forEach((slide) => slide.classList.remove('active'));
        dots.forEach((dot) => dot.classList.remove('active'));

        // Wrap indices correctly
        if (index >= slides.length) activeSlideIndex = 0;
        else if (index < 0) activeSlideIndex = slides.length - 1;
        else activeSlideIndex = index;

        slides[activeSlideIndex].classList.add('active');
        dots[activeSlideIndex].classList.add('active');
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        slideTimer = setInterval(() => {
            showSlide(activeSlideIndex + 1);
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        if (slideTimer) clearInterval(slideTimer);
    };

    // Bind button arrows click
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(activeSlideIndex - 1);
            startAutoPlay();
        });
        nextBtn.addEventListener('click', () => {
            showSlide(activeSlideIndex + 1);
            startAutoPlay();
        });
    }

    // Bind dots click indicator
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoPlay);
        heroSection.addEventListener('mouseleave', startAutoPlay);
        
        // Touch gestures support (Swipe left/right)
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50; // pixels
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe Left -> Next Slide
                showSlide(activeSlideIndex + 1);
                startAutoPlay();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe Right -> Prev Slide
                showSlide(activeSlideIndex - 1);
                startAutoPlay();
            }
        };
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(activeSlideIndex - 1);
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            showSlide(activeSlideIndex + 1);
            startAutoPlay();
        }
    });

    // Start auto cycle initially
    startAutoPlay();

    // 5. SCROLL REVEAL OBSERVER
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));

    // 6. METRIC COUNT-UP STATS ANIMATION
    const counterElements = document.querySelectorAll('.counter');
    const startCounterAnimation = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 2000; // 2 seconds animation duration
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let currentCount = 0;

        const timer = setInterval(() => {
            currentCount += Math.ceil(target / (duration / stepTime));
            if (currentCount >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = currentCount;
            }
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounterAnimation(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counterElements.forEach((counter) => counterObserver.observe(counter));

    // 7. FAQ ACCORDION LOGIC
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                otherItem.querySelector('.faq-panel').style.maxHeight = '0';
                otherItem.querySelector('.faq-panel').style.paddingTop = '0';
            });

            // Toggle selected item
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });

    // 8. ADMISSION FORM INLINE VALIDATIONS & SUBMIT
    const enquiryForm = document.getElementById('enquiryForm');
    const successAlert = document.getElementById('successAlert');

    const inputs = {
        studentName: document.getElementById('studentName'),
        parentName: document.getElementById('parentName'),
        mobileNumber: document.getElementById('mobileNumber'),
        board: document.getElementById('board'),
        studentClass: document.getElementById('studentClass'),
        subject: document.getElementById('subject'),
        batch: document.getElementById('batch'),
        time: document.getElementById('time')
    };

    // Helper to display errors inline
    const showError = (fieldKey, message) => {
        const errorSpan = document.getElementById(`${fieldKey}Error`);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
        if (inputs[fieldKey]) {
            inputs[fieldKey].style.borderColor = '#e53e3e';
        }
    };

    // Helper to clear error logs
    const clearError = (fieldKey) => {
        const errorSpan = document.getElementById(`${fieldKey}Error`);
        if (errorSpan) {
            errorSpan.textContent = '';
        }
        if (inputs[fieldKey]) {
            inputs[fieldKey].style.borderColor = 'rgba(0,0,0,0.15)';
        }
    };

    // Setup input listeners to clear errors on user correction
    Object.keys(inputs).forEach((key) => {
        if (inputs[key]) {
            const eventName = inputs[key].tagName === 'SELECT' ? 'change' : 'input';
            inputs[key].addEventListener(eventName, () => clearError(key));
        }
    });

    // Validation runner
    const validateForm = () => {
        let isValid = true;

        // Student Name Check
        if (!inputs.studentName.value.trim()) {
            showError('studentName', 'Student Name is required');
            isValid = false;
        } else {
            clearError('studentName');
        }

        // Parent Name Check
        if (!inputs.parentName.value.trim()) {
            showError('parentName', 'Parent Name is required');
            isValid = false;
        } else {
            clearError('parentName');
        }

        // Mobile Number Check
        const mobileVal = inputs.mobileNumber.value.trim();
        const numberPattern = /^[0-9]+$/;
        if (!mobileVal) {
            showError('mobileNumber', 'Mobile Number is required');
            isValid = false;
        } else if (!numberPattern.test(mobileVal)) {
            showError('mobileNumber', 'Only numeric digits allowed');
            isValid = false;
        } else if (mobileVal.length !== 10) {
            showError('mobileNumber', 'Indian Mobile numbers must be exactly 10 digits');
            isValid = false;
        } else {
            clearError('mobileNumber');
        }

        // Dropdowns checks
        const dropdowns = ['board', 'studentClass', 'subject', 'batch', 'time'];
        dropdowns.forEach((dropdown) => {
            if (!inputs[dropdown].value) {
                showError(dropdown, `Please select a valid option`);
                isValid = false;
            } else {
                clearError(dropdown);
            }
        });

        return isValid;
    };

    // Form submission interceptor
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validateForm()) {
                // Focus on first invalid element
                const firstInvalid = Object.keys(inputs).find((key) => {
                    const errorSpan = document.getElementById(`${key}Error`);
                    return errorSpan && errorSpan.textContent !== '';
                });
                if (firstInvalid && inputs[firstInvalid]) {
                    inputs[firstInvalid].focus();
                }
                return;
            }

            // Capture field variables
            const student = inputs.studentName.value.trim();
            const parent = inputs.parentName.value.trim();
            const mobile = inputs.mobileNumber.value.trim();
            const email = document.getElementById('email').value.trim() || 'Not Provided';
            const boardSelected = inputs.board.value;
            const classSelected = inputs.studentClass.value;
            const subjectSelected = inputs.subject.value;
            const batchSelected = inputs.batch.value;
            const timeSelected = inputs.time.value;
            const userMsg = document.getElementById('message').value.trim() || 'No additional message';

            // Show success modal feedback screen
            successAlert.classList.add('active');

            // Construct Whatsapp Admit enquiry format message text details
            const whatsappText = 
`*ADMISSION ENQUIRY*
*Balram Sir Tuitions*
==========================

*Student Details:*
• Name: ${student}
• Class: ${classSelected}
• Board: ${boardSelected}
• Subject Interest: ${subjectSelected}

*Parent Details:*
• Parent Name: ${parent}
• Mobile Number: +91 ${mobile}
• Email: ${email}

*Class Preferences:*
• Batch Program: ${batchSelected}
• Time Slot: ${timeSelected}

*Message / Goals:*
"${userMsg}"

==========================
Please schedule my demo sessions. Thank you!`;

            const encodedMessage = encodeURIComponent(whatsappText);
            // Form redirects target recipient WhatsApp number: +91 89551795790 (cleaned target: 9189551795790)
            const targetWhatsappUrl = `https://wa.me/9189551795790?text=${encodedMessage}`;

            // Redirect delay after success popup renders
            setTimeout(() => {
                window.open(targetWhatsappUrl, '_blank');
                
                // Reset form fields state
                enquiryForm.reset();
                successAlert.classList.remove('active');
            }, 1800);
        });
    }

    // 9. BACK TO TOP BUTTON LOGIC
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
