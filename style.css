/* -------------------------------------------------------------
   BALRAM SIR TUITIONS - PREMIUM AGENCY STYLE SHEET
   ------------------------------------------------------------- */

/* =============================================================
   1. DESIGN TOKENS & CSS VARIABLES
   ============================================================= */
:root {
    /* Color Palette */
    --color-primary: #0b1e36;        /* Deep Premium Navy */
    --color-primary-light: #1e293b;  /* Muted Slate Blue */
    --color-secondary: #1e40af;      /* Classical Royal Blue */
    --color-accent: #3b82f6;         /* Azure Accent Blue */
    --color-accent-light: #eff6ff;   /* Muted Light Blue */
    --color-highlight: #d97706;      /* Rich Dark Amber Gold */
    --color-highlight-light: #fef3c7;/* Champagne Highlight */
    --color-dark: #1e293b;           /* Charcoal Body Text */
    --color-light: #fafaf9;          /* Warm Cream Background */
    --color-white: #ffffff;          /* Pure White */
    
    /* Gradients */
    --gradient-hero: linear-gradient(135deg, rgba(11, 30, 54, 0.97) 0%, rgba(30, 64, 175, 0.88) 100%);
    --gradient-premium: linear-gradient(135deg, #0b1e36 0%, #1e40af 100%);
    --gradient-gold: linear-gradient(135deg, #d97706 0%, #fbbf24 100%);
    --gradient-soft: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
    --gradient-card: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%);
    
    /* Shadows (Multi-Layered & Soft) */
    --shadow-sm: 0 2px 4px rgba(11, 30, 54, 0.02);
    --shadow-md: 0 10px 30px -10px rgba(11, 30, 54, 0.08), 0 1px 3px rgba(11, 30, 54, 0.02);
    --shadow-lg: 0 20px 40px -15px rgba(11, 30, 54, 0.12), 0 2px 10px -5px rgba(11, 30, 54, 0.04);
    --shadow-premium: 0 35px 70px -15px rgba(11, 30, 54, 0.18), 0 10px 30px -10px rgba(30, 64, 175, 0.1);
    
    /* Glassmorphism Styles */
    --backdrop-glass: blur(16px);
    --border-glass: rgba(255, 255, 255, 0.45);
    --border-glass-hover: rgba(255, 255, 255, 0.7);
    --border-soft: rgba(11, 30, 54, 0.06);

    /* Typography */
    --font-heading: 'Outfit', sans-serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
    
    /* Radius & Transitions */
    --radius-sm: 8px;
    --radius-md: 16px;
    --radius-lg: 24px;
    --radius-full: 9999px;
    --transition-smooth: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    --transition-fast: all 0.25s ease-in-out;
}

/* =============================================================
   2. GLOBAL RESET & BASE INITIALIZATION
   ============================================================= */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
    overflow-x: hidden;
}

body {
    font-family: var(--font-body);
    background-color: var(--color-light);
    color: var(--color-dark);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
}

/* Lock body scrolling when mobile menu menu is active */
body.menu-open {
    overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--color-primary);
    font-weight: 700;
    line-height: 1.25;
}

a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition-fast);
}

button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Custom Premium Webkit Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: var(--color-light);
}
::-webkit-scrollbar-thumb {
    background: var(--color-primary);
    border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
    background: var(--color-secondary);
}

/* Selection Highlight Styles */
::selection {
    background-color: var(--color-secondary);
    color: var(--color-white);
}

/* Scroll progress indicator line */
.scroll-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--gradient-gold);
    width: 0%;
    z-index: 1100;
    transition: width 0.1s ease-out;
}

/* =============================================================
   3. REUSABLE SYSTEM & LAYOUT UTILITIES
   ============================================================= */
.container {
    width: 100%;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 24px;
}

.text-center {
    text-align: center;
}

.section-tag {
    display: inline-block;
    padding: 6px 18px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--color-secondary);
    background-color: var(--color-accent-light);
    border-radius: var(--radius-full);
    margin-bottom: 16px;
    box-shadow: var(--shadow-sm);
}

.section-tag.inverse {
    background-color: var(--color-highlight);
    color: var(--color-white);
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.6rem);
    margin-bottom: 20px;
    letter-spacing: -0.5px;
}

.section-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.15rem);
    color: var(--color-primary-light);
    max-width: 700px;
    margin: 0 auto 70px auto;
    opacity: 0.85;
}

.highlight-text {
    background: linear-gradient(120deg, var(--color-highlight) 0%, #fbbf24 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

/* Decorative Section Divider */
.section-divider {
    height: 4px;
    width: 80px;
    background: var(--gradient-gold);
    margin: 0 auto 40px auto;
    border-radius: var(--radius-full);
}

/* Button UI Components */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 32px;
    font-weight: 600;
    border-radius: var(--radius-md);
    transition: var(--transition-smooth);
    cursor: pointer;
    box-shadow: var(--shadow-md);
}

.btn-primary {
    background-color: var(--color-primary);
    color: var(--color-white);
}

.btn-primary:hover {
    background-color: var(--color-secondary);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(30, 64, 175, 0.25);
}

.btn-secondary {
    background-color: transparent;
    color: var(--color-white);
    border: 2px solid var(--color-white);
}

.btn-secondary:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.btn-accent {
    background: var(--gradient-gold);
    color: var(--color-white);
    border: none;
    font-weight: 700;
}

.btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(217, 119, 6, 0.35);
}

.btn-block {
    display: flex;
    width: 100%;
}

.btn-sm {
    padding: 10px 22px;
    font-size: 0.9rem;
}

.btn-text {
    font-weight: 700;
    color: var(--color-secondary);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: var(--transition-fast);
}

.btn-text:hover {
    color: var(--color-primary);
    transform: translateX(4px);
}

/* Glassmorphism base layout helper */
.glass-card {
    background: var(--gradient-card);
    backdrop-filter: var(--backdrop-glass);
    border: 1px solid var(--border-glass);
    box-shadow: var(--shadow-md);
}

/* =============================================================
   4. STICKY GLASS NAVIGATION BAR
   ============================================================= */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: var(--transition-smooth);
    background-color: transparent;
    border-bottom: 1px solid transparent;
}

.header.scrolled {
    background-color: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border-glass);
    box-shadow: var(--shadow-md);
}

.nav-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: var(--transition-smooth);
}

.header.scrolled .nav-container {
    padding: 12px 24px;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 46px;
    height: 46px;
    background: var(--gradient-premium);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: 1.7rem;
    box-shadow: var(--shadow-md);
}

.logo-text {
    font-size: 1.4rem;
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1;
}

.logo-text span {
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--color-secondary);
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-link {
    font-weight: 600;
    font-size: 0.92rem;
    color: var(--color-primary-light);
    position: relative;
    padding: 6px 0;
}

/* Premium active link transition indicator */
.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--gradient-gold);
    border-radius: var(--radius-full);
    transition: var(--transition-smooth);
}

.nav-link:hover {
    color: var(--color-secondary);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.nav-call-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--color-primary);
    background-color: rgba(255, 255, 255, 0.95);
    padding: 10px 18px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-soft);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-fast);
}

.nav-call-btn:hover {
    color: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.nav-admission-btn {
    background-color: var(--color-secondary);
    color: var(--color-white);
    padding: 12px 24px;
    font-weight: 600;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    box-shadow: var(--shadow-md);
    transition: var(--transition-smooth);
}

.nav-admission-btn:hover {
    background-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(11, 30, 54, 0.2);
}

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 28px;
    height: 18px;
    background: transparent;
    cursor: pointer;
    z-index: 1001;
}

.mobile-menu-toggle span {
    width: 100%;
    height: 2.5px;
    background-color: var(--color-primary);
    border-radius: var(--radius-full);
    transition: var(--transition-fast);
}

.mobile-only {
    display: none;
}

/* =============================================================
   5. PREMIUM HERO SLIDER SECTION
   ============================================================= */
.hero-slider {
    position: relative;
    height: 100vh;
    min-height: 680px;
    overflow: hidden;
    background-color: var(--color-primary);
}

.slider-wrapper {
    height: 100%;
    position: relative;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
}

.slide.active {
    opacity: 1;
    z-index: 2;
}

.slide-image-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #0b1e36, #1e40af);
}

.slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.35;
    transition: transform 8s ease-out;
}

.slide.active .slide-img {
    transform: scale(1.08);
}

.slide-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-hero);
}

/* Strict separated CSS Grid layout for slides content */
.slide-grid-container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 100px 24px 0 24px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    z-index: 10;
    height: 100%;
    width: 100%;
}

.slide-text-side {
    max-width: 580px;
    color: var(--color-white);
}

.slide .badge-label {
    background-color: var(--color-highlight);
    color: var(--color-white);
    padding: 8px 18px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    border-radius: var(--radius-full);
    display: inline-block;
    margin-bottom: 24px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.active .badge-label {
    opacity: 1;
    transform: translateY(0);
}

.slide-title {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    line-height: 1.15;
    margin-bottom: 24px;
    color: var(--color-white);
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.7s 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.active .slide-title {
    opacity: 1;
    transform: translateY(0);
}

.slide-desc {
    font-size: clamp(1rem, 2vw, 1.2rem);
    margin-bottom: 40px;
    color: rgba(255,255,255,0.92);
    opacity: 0;
    transform: translateY(35px);
    transition: all 0.7s 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.active .slide-desc {
    opacity: 1;
    transform: translateY(0);
}

.slide-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.7s 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide.active .slide-actions {
    opacity: 1;
    transform: translateY(0);
}

/* Slide image compartment styling */
.slide-image-side {
    display: flex;
    justify-content: center;
    position: relative;
}

.hero-visual-frame {
    position: relative;
    width: 100%;
    max-width: 440px;
    aspect-ratio: 4/3;
    border-radius: var(--radius-md);
    overflow: visible;
    box-shadow: var(--shadow-premium);
}

.hero-frame-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 4px solid rgba(255, 255, 255, 0.15);
}

.hero-floating-card {
    position: absolute;
    bottom: -20px;
    left: -20px;
    background: var(--gradient-gold);
    color: var(--color-white);
    padding: 16px 24px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    text-align: center;
    z-index: 20;
    transition: var(--transition-smooth);
}

.hero-floating-card .h-card-num {
    font-size: 1.8rem;
    font-weight: 800;
    line-height: 1.1;
}

.hero-floating-card .h-card-txt {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.hero-floating-card.accent-variant {
    background: var(--gradient-premium);
    border: 1px solid var(--border-glass);
}

.hero-floating-card.gold-variant {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Slider Controls */
.slider-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 100;
    backdrop-filter: blur(8px);
    transition: var(--transition-fast);
}

.slider-control:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
    transform: translateY(-50%) scale(1.05);
}

.slider-control.prev { left: 3%; }
.slider-control.next { right: 3%; }

.slider-dots {
    position: absolute;
    bottom: 6%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 100;
}

.slider-dots .dot {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-full);
    cursor: pointer;
    border: none;
    transition: var(--transition-smooth);
}

.slider-dots .dot.active {
    background-color: var(--color-highlight);
    width: 32px;
}

/* =============================================================
   6. HIGHLIGHTS / STATISTICS SECTION
   ============================================================= */
.highlights-section {
    padding: 0;
    margin-top: -50px;
    position: relative;
    z-index: 50;
}

.highlights-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.highlight-card {
    background: var(--gradient-card);
    backdrop-filter: var(--backdrop-glass);
    border: 1px solid var(--border-glass);
    padding: 30px 24px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: var(--transition-smooth);
}

.highlight-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-premium);
    background-color: var(--color-white);
}

.highlight-icon-wrapper {
    width: 60px;
    height: 60px;
    background: var(--color-accent-light);
    color: var(--color-secondary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.highlight-card:hover .highlight-icon-wrapper {
    background: var(--gradient-premium);
    color: var(--color-white);
    transform: rotateY(360deg);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.highlight-number {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    font-weight: 800;
    color: var(--color-primary);
    line-height: 1.1;
}

.highlight-label {
    font-size: 0.92rem;
    color: var(--color-primary-light);
    font-weight: 600;
    margin-top: 4px;
}

/* =============================================================
   7. ABOUT INSTITUTE SECTION & BACKGROUND BLOBS
   ============================================================= */
.about-section {
    padding: 120px 0 90px 0;
    background-color: var(--color-white);
    position: relative;
    overflow: hidden;
}

/* Parallax Background Blobs */
.floating-blob {
    position: absolute;
    border-radius: var(--radius-full);
    filter: blur(80px);
    opacity: 0.35;
    z-index: 1;
    pointer-events: none;
    animation: blob-float 12s infinite ease-in-out;
}

.blob-1 {
    width: 300px;
    height: 300px;
    background: var(--color-accent);
    top: -50px;
    right: -50px;
}

.blob-2 {
    width: 400px;
    height: 400px;
    background: var(--color-highlight-light);
    bottom: -100px;
    left: -100px;
    animation-delay: -4s;
}

@keyframes blob-float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.15); }
}

.about-grid {
    display: grid;
    grid-template-columns: 1.1fr 1.2fr;
    gap: 70px;
    align-items: center;
    position: relative;
    z-index: 5;
}

.image-wrapper-decorative {
    position: relative;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    background: linear-gradient(135deg, #f7fafc, #eff6ff);
}

.about-main-image {
    border-radius: var(--radius-lg);
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    box-shadow: var(--shadow-md);
}

.experience-badge-stamp {
    position: absolute;
    bottom: -24px;
    right: -24px;
    background: var(--gradient-gold);
    color: var(--color-white);
    padding: 22px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    text-align: center;
}

.experience-badge-stamp .badge-num {
    font-size: 2.1rem;
    font-weight: 800;
    line-height: 1;
}

.experience-badge-stamp .badge-txt {
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 4px;
}

.about-content-column .section-title {
    margin-bottom: 24px;
}

.section-lead {
    font-size: 1.1rem;
    color: var(--color-dark);
    margin-bottom: 35px;
    opacity: 0.9;
}

.about-values {
    display: flex;
    flex-direction: column;
    gap: 28px;
    margin-bottom: 45px;
}

.value-item {
    display: flex;
    gap: 20px;
}

.value-icon {
    width: 48px;
    height: 48px;
    background-color: var(--color-accent-light);
    color: var(--color-secondary);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.value-details h3 {
    font-size: 1.25rem;
    margin-bottom: 6px;
}

.value-details p {
    color: var(--color-primary-light);
    opacity: 0.85;
    font-size: 0.95rem;
}

.about-footer-cta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 28px;
}

/* =============================================================
   8. WHY CHOOSE OUR INSTITUTE (FEATURE CARDS)
   ============================================================= */
.why-choose-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

.feature-card {
    padding: 35px 28px;
    border-radius: var(--radius-md);
    transition: var(--transition-smooth);
}

.feature-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--border-glass-hover);
}

.feature-icon {
    color: var(--color-secondary);
    margin-bottom: 24px;
    display: inline-block;
    transition: var(--transition-fast);
}

.feature-card:hover .feature-icon {
    color: var(--color-highlight);
    transform: scale(1.1);
}

.feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: 12px;
}

.feature-card p {
    font-size: 0.95rem;
    color: var(--color-primary-light);
    opacity: 0.85;
    line-height: 1.6;
}

/* =============================================================
   9. COURSES SECTION
   ============================================================= */
.courses-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.course-card {
    background-color: var(--color-light);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-soft);
    overflow: hidden;
    position: relative;
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-sm);
}

.course-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(30, 64, 175, 0.15);
}

.course-badge {
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 10px 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    align-self: flex-start;
    border-radius: 0 0 var(--radius-md) 0;
}

.course-content {
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.course-content h3 {
    font-size: 1.55rem;
    margin-bottom: 16px;
}

.course-boards {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 22px;
}

.board-pill {
    background-color: var(--color-primary-light);
    color: var(--color-white);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
}

.medium-pill {
    background-color: var(--color-accent-light);
    color: var(--color-secondary);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 700;
}

.course-desc {
    font-size: 0.95rem;
    color: var(--color-dark);
    margin-bottom: 24px;
    opacity: 0.9;
}

.course-features {
    list-style: none;
    margin-bottom: 30px;
}

.course-features li {
    font-size: 0.95rem;
    margin-bottom: 10px;
    position: relative;
    padding-left: 24px;
}

.course-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-secondary);
    font-weight: 700;
}

.course-footer {
    margin-top: auto;
}

/* Most Popular Highlight Card */
.course-card.popular-highlight {
    background: var(--color-white);
    border: 2px solid var(--color-secondary);
    box-shadow: var(--shadow-lg);
}

.course-card.popular-highlight .course-badge {
    background-color: var(--color-secondary);
}

.popular-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    background: var(--gradient-gold);
    color: var(--color-white);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 6px 14px;
    border-radius: var(--radius-full);
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* =============================================================
   10. SUBJECTS SECTION
   ============================================================= */
.subjects-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.subjects-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.subject-card {
    background-color: var(--color-white);
    border-radius: var(--radius-md);
    padding: 30px 24px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-smooth);
    border: 1px solid var(--border-soft);
}

.subject-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-md);
    background: var(--color-accent-light);
    border-color: rgba(30, 64, 175, 0.1);
}

.subject-icon {
    width: 58px;
    height: 58px;
    margin: 0 auto 20px auto;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
    box-shadow: var(--shadow-sm);
}

.subject-icon.math { background: #fee2e2; color: #ef4444; }
.subject-icon.physics { background: #fef3c7; color: #f59e0b; }
.subject-icon.chemistry { background: #e0f2fe; color: #0284c7; }
.subject-icon.biology { background: #dcfce7; color: #22c55e; }
.subject-icon.accountancy { background: #fae8ff; color: #c084fc; }
.subject-icon.economics { background: #ffe4e6; color: #f43f5e; }
.subject-icon.business { background: #f0fdf4; color: #16a34a; }
.subject-icon.english { background: #f3e8ff; color: #8b5cf6; }

.subject-card h3 {
    font-size: 1.25rem;
    margin-bottom: 12px;
}

.subject-card p {
    font-size: 0.9rem;
    color: var(--color-primary-light);
    opacity: 0.85;
}

/* =============================================================
   11. FACULTY SECTION
   ============================================================= */
.faculty-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.faculty-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
}

.faculty-card {
    background-color: var(--color-light);
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-smooth);
    border: 1px solid var(--border-soft);
}

.faculty-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(30, 64, 175, 0.1);
}

.faculty-image-container {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #0b1e36, #1e40af);
    aspect-ratio: 4/5;
}

.faculty-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.85;
    transition: var(--transition-smooth);
}

.faculty-card:hover .faculty-img {
    transform: scale(1.06);
    opacity: 0.95;
}

.faculty-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    background: linear-gradient(0deg, rgba(11, 30, 54, 0.95) 0%, rgba(11, 30, 54, 0) 100%);
    color: var(--color-white);
}

.faculty-overlay span {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-highlight);
}

.faculty-info {
    padding: 24px;
}

.faculty-info h3 {
    font-size: 1.3rem;
    margin-bottom: 4px;
}

.faculty-qualification {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-secondary);
}

.faculty-exp {
    font-size: 0.85rem;
    color: var(--color-primary-light);
    margin-bottom: 12px;
    font-weight: 500;
}

.faculty-bio {
    font-size: 0.9rem;
    color: var(--color-dark);
    opacity: 0.85;
    line-height: 1.55;
}

/* =============================================================
   12. FEES STRUCTURE SECTION
   ============================================================= */
.fees-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.fees-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    margin-bottom: 50px;
}

.fee-card {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-soft);
    padding: 50px;
    box-shadow: var(--shadow-md);
    position: relative;
    overflow: hidden;
    transition: var(--transition-smooth);
}

.fee-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
}

.fee-header {
    border-bottom: 1px solid var(--color-accent-light);
    padding-bottom: 30px;
    margin-bottom: 30px;
}

.fee-header h3 {
    font-size: 1.7rem;
    margin-bottom: 10px;
}

.fee-price {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-primary);
}

.fee-price span {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-primary-light);
}

.fee-list {
    list-style: none;
    margin-bottom: 35px;
}

.fee-list li {
    font-size: 1.05rem;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0,0,0,0.02);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.fee-list li strong {
    color: var(--color-primary);
}

.fee-badge-info {
    background-color: var(--color-accent-light);
    color: var(--color-secondary);
    padding: 12px;
    border-radius: var(--radius-sm);
    text-align: center;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 30px;
}

.fee-card.popular-highlight {
    border: 2px solid var(--color-secondary);
}

.scholarship-info-box {
    background: var(--gradient-premium);
    color: var(--color-white);
    padding: 40px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: flex;
    gap: 30px;
    align-items: center;
}

.scholarship-icon {
    font-size: 3rem;
    line-height: 1;
}

.scholarship-content h3 {
    color: var(--color-white);
    font-size: 1.6rem;
    margin-bottom: 8px;
}

.scholarship-content p {
    color: rgba(255,255,255,0.9);
    font-size: 1.05rem;
    line-height: 1.6;
}

.scholarship-content strong {
    color: var(--color-highlight-light);
}

/* =============================================================
   13. STUDENT ACHIEVEMENTS SECTION (PROGRESS BARS & TIMELINE)
   ============================================================= */
.achievements-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.toppers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 35px;
    margin-bottom: 70px;
}

.topper-card {
    background-color: var(--color-light);
    border-radius: var(--radius-md);
    padding: 40px 30px;
    text-align: center;
    position: relative;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-soft);
    transition: var(--transition-smooth);
}

.topper-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    background-color: var(--color-white);
}

.topper-badge {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient-gold);
    color: var(--color-white);
    padding: 6px 20px;
    font-size: 1.1rem;
    font-weight: 800;
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
}

.topper-avatar {
    width: 80px;
    height: 80px;
    background: var(--gradient-premium);
    color: var(--color-white);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px auto 20px auto;
    font-size: 1.8rem;
    font-weight: 800;
    box-shadow: var(--shadow-sm);
}

.topper-card h3 {
    font-size: 1.4rem;
    margin-bottom: 6px;
}

.topper-class {
    font-size: 0.9rem;
    color: var(--color-secondary);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
}

.topper-quote {
    font-size: 0.95rem;
    color: var(--color-dark);
    font-style: italic;
    opacity: 0.85;
}

.achievements-progress-container {
    background-color: var(--color-light);
    border-radius: var(--radius-lg);
    padding: 50px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-soft);
}

.achievements-progress-container h3 {
    font-size: 1.55rem;
    margin-bottom: 30px;
    text-align: center;
}

.metrics-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
}

.metric-progress-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.metric-desc {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: var(--color-primary);
}

.progress-bar-bg {
    width: 100%;
    height: 12px;
    background-color: rgba(11, 30, 54, 0.08);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: var(--gradient-premium);
    border-radius: var(--radius-full);
    width: 0;
    transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

/* =============================================================
   14. GALLERY SECTION (EXACTLY 3 IMAGES) & LIGHTBOX PREVIEW
   ============================================================= */
.gallery-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.gallery-grid-three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.gallery-item-three {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    aspect-ratio: 4/3;
    background: linear-gradient(135deg, #0b1e36, #1e40af);
    cursor: pointer;
}

.gallery-item-three .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    transition: var(--transition-smooth);
}

.gallery-item-three:hover .gallery-img {
    transform: scale(1.1);
    opacity: 0.65;
}

.gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 24px;
    background: linear-gradient(0deg, rgba(11, 30, 54, 0.95) 0%, rgba(11, 30, 54, 0) 100%);
    color: var(--color-white);
    opacity: 0;
    transform: translateY(20px);
    transition: var(--transition-smooth);
}

.gallery-item-three:hover .gallery-overlay {
    opacity: 1;
    transform: translateY(0);
}

.gallery-overlay h4 {
    color: var(--color-white);
    font-size: 1.25rem;
    margin-bottom: 6px;
}

.gallery-overlay p {
    font-size: 0.9rem;
    opacity: 0.85;
}

/* Lightbox Modal */
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(11, 30, 54, 0.95);
    z-index: 1500;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: var(--transition-fast);
}

.lightbox-overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.lightbox-container {
    max-width: 90%;
    max-height: 80%;
    text-align: center;
    position: relative;
}

.lightbox-container img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-premium);
    border: 3px solid rgba(255,255,255,0.1);
}

.lightbox-caption {
    color: var(--color-white);
    margin-top: 15px;
    font-family: var(--font-heading);
    font-size: 1.2rem;
    font-weight: 600;
}

.lightbox-close {
    position: absolute;
    top: 30px;
    right: 30px;
    background: transparent;
    font-size: 3rem;
    color: var(--color-white);
    cursor: pointer;
    line-height: 1;
    transition: var(--transition-fast);
}

.lightbox-close:hover {
    color: var(--color-highlight);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-white);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 50px;
    height: 50px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: var(--transition-fast);
}

.lightbox-nav:hover {
    background-color: var(--color-white);
    color: var(--color-primary);
}

.lightbox-nav.prev { left: 4%; }
.lightbox-nav.next { right: 4%; }

/* =============================================================
   15. TESTIMONIALS (STUDENT & PARENT REVIEWS)
   ============================================================= */
.testimonials-student-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.testimonials-parent-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.testimonial-card {
    background-color: var(--color-white);
    border-radius: var(--radius-md);
    padding: 40px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-soft);
    position: relative;
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
}

.student-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-glass);
}

.testimonial-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(30, 64, 175, 0.15);
}

.quote-mark {
    font-size: 5rem;
    color: rgba(30, 64, 175, 0.08);
    line-height: 1;
    position: absolute;
    top: 15px;
    right: 25px;
    font-family: Georgia, serif;
}

.testimonial-text {
    font-size: 1rem;
    color: var(--color-dark);
    margin-bottom: 30px;
    line-height: 1.7;
    position: relative;
    z-index: 2;
    flex-grow: 1;
}

.testimonial-author {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0,0,0,0.05);
    padding-top: 20px;
    margin-top: auto;
}

.author-info h4 {
    font-size: 1.1rem;
    margin-bottom: 2px;
}

.author-info p {
    font-size: 0.85rem;
    color: var(--color-secondary);
    font-weight: 700;
}

.star-rating {
    font-size: 0.95rem;
}

.parent-card {
    background-color: var(--color-white);
}

/* =============================================================
   16. ADMISSION PROCESS (TIMELINE)
   ============================================================= */
.admission-process-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.timeline-container {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
}

.timeline-line {
    position: absolute;
    left: 50px;
    top: 30px;
    bottom: 30px;
    width: 4px;
    background-color: var(--color-accent-light);
    z-index: 1;
}

.timeline-step {
    position: relative;
    z-index: 5;
    display: flex;
    gap: 35px;
    margin-bottom: 45px;
}

.timeline-step:last-child {
    margin-bottom: 0;
}

.timeline-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-premium);
    color: var(--color-white);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.4rem;
    box-shadow: var(--shadow-md);
    flex-shrink: 0;
    border: 4px solid var(--color-white);
    transition: var(--transition-fast);
}

.timeline-step:hover .timeline-icon {
    background: var(--gradient-gold);
    color: var(--color-white);
    transform: scale(1.1);
}

.timeline-content {
    background-color: var(--color-light);
    border-radius: var(--radius-md);
    padding: 24px 30px;
    box-shadow: var(--shadow-sm);
    flex-grow: 1;
    transition: var(--transition-smooth);
    border: 1px solid var(--border-soft);
}

.timeline-step:hover .timeline-content {
    background-color: var(--color-white);
    box-shadow: var(--shadow-md);
    border-color: rgba(30, 64, 175, 0.1);
}

.timeline-content h3 {
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.timeline-content p {
    color: var(--color-primary-light);
    opacity: 0.85;
    font-size: 0.95rem;
}

/* =============================================================
   17. ADMISSION / ENQUIRY FORM SECTION
   ============================================================= */
.admission-form-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.form-wrapper-outer {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    border: 1px solid var(--border-soft);
}

.form-info-column {
    background: var(--gradient-premium);
    color: var(--color-white);
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-info-column h2 {
    color: var(--color-white);
    font-size: 2.2rem;
    margin-bottom: 20px;
    line-height: 1.25;
}

.form-info-column p {
    opacity: 0.9;
    font-size: 1.05rem;
    margin-bottom: 45px;
}

.form-contact-summary {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.c-item {
    display: flex;
    align-items: center;
    gap: 20px;
}

.c-icon {
    font-size: 2rem;
    line-height: 1;
}

.c-item h4 {
    color: var(--color-white);
    font-size: 1.1rem;
}

.c-item p {
    margin-bottom: 0;
    font-size: 0.95rem;
    opacity: 0.85;
}

.form-fields-column {
    padding: 60px;
    position: relative;
}

.form-row-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 24px;
}

.form-row-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;
}

.input-group {
    position: relative;
}

.input-group input,
.input-group textarea {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid rgba(11,30,54,0.15);
    background-color: var(--color-white);
    border-radius: var(--radius-sm);
    color: var(--color-dark);
    font-size: 0.95rem;
    transition: var(--transition-fast);
}

.input-group input:focus,
.input-group textarea:focus {
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.12);
}

.input-group label {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--color-white);
    padding: 0 4px;
    color: rgba(11,30,54,0.5);
    font-size: 0.95rem;
    pointer-events: none;
    transition: var(--transition-fast);
}

.input-group textarea ~ label {
    top: 25px;
}

/* Floating labels effect */
.input-group input:focus ~ label,
.input-group input:not(:placeholder-shown) ~ label {
    top: 0;
    font-size: 0.8rem;
    color: var(--color-secondary);
    font-weight: 700;
}

.input-group textarea:focus ~ label,
.input-group textarea:not(:placeholder-shown) ~ label {
    top: 0;
    font-size: 0.8rem;
    color: var(--color-secondary);
    font-weight: 700;
}

.input-group.full-width {
    margin-bottom: 30px;
}

.select-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.select-group label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--color-primary-light);
}

.select-group select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid rgba(11,30,54,0.15);
    border-radius: var(--radius-sm);
    background-color: var(--color-white);
    color: var(--color-dark);
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition-fast);
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position: right 12px center;
}

.select-group select:focus {
    border-color: var(--color-secondary);
}

.error-msg {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 4px;
    display: block;
    font-weight: 600;
}

/* Success notification screen overlay */
.form-success-alert {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-white);
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0;
    pointer-events: none;
    z-index: 50;
    transition: var(--transition-smooth);
}

.form-success-alert.active {
    opacity: 1;
    pointer-events: auto;
}

.form-success-alert h4 {
    font-size: 1.8rem;
    color: var(--color-primary);
    margin-bottom: 12px;
}

.form-success-alert p {
    color: var(--color-primary-light);
    font-size: 1.05rem;
}

/* Inputs shaking animation on validation errors */
.shake-error {
    animation: shake 0.4s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
}

/* =============================================================
   18. FAQ SECTION Accordion
   ============================================================= */
.faq-section {
    padding: 100px 0;
    background-color: var(--color-white);
}

.faq-accordion-wrapper {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.faq-item {
    background-color: var(--color-light);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-soft);
    overflow: hidden;
    transition: var(--transition-smooth);
}

.faq-trigger {
    width: 100%;
    padding: 24px 30px;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    font-family: var(--font-heading);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-primary);
    cursor: pointer;
    transition: var(--transition-fast);
}

.faq-trigger:hover {
    color: var(--color-secondary);
}

.faq-icon-arrow {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color-secondary);
    transition: transform var(--transition-fast);
}

.faq-panel {
    max-height: 0;
    overflow: hidden;
    padding: 0 30px;
    transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease;
}

.faq-panel p {
    color: var(--color-primary-light);
    opacity: 0.85;
    padding-bottom: 24px;
    line-height: 1.7;
    font-size: 0.95rem;
}

/* Active FAQ states */
.faq-item.active {
    background-color: var(--color-white);
    border-color: rgba(30, 64, 175, 0.15);
    box-shadow: var(--shadow-md);
}

.faq-item.active .faq-icon-arrow {
    transform: rotate(45deg);
}

/* =============================================================
   19. CONTACT SECTION
   ============================================================= */
.contact-section {
    padding: 100px 0;
    background-color: var(--color-light);
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 60px;
}

.contact-info-column {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.contact-card-detail {
    background-color: var(--color-white);
    border-radius: var(--radius-sm);
    padding: 24px 30px;
    box-shadow: var(--shadow-sm);
    display: flex;
    gap: 20px;
    align-items: center;
    border: 1px solid var(--border-soft);
    transition: var(--transition-smooth);
}

.contact-card-detail:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}

.contact-card-detail .icon {
    font-size: 2rem;
    line-height: 1;
}

.contact-card-detail .text h3 {
    font-size: 1.15rem;
    margin-bottom: 4px;
}

.contact-card-detail .text p {
    font-size: 0.95rem;
    color: var(--color-primary-light);
    opacity: 0.85;
}

.contact-card-detail .text a:hover {
    color: var(--color-secondary);
}

.contact-map-column {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.map-container-wrapper {
    height: 100%;
    min-height: 380px;
}

.map-mock-bg {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1e293b 0%, #0b1e36 100%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
}

.map-overlay-content {
    background-color: rgba(255,255,255,0.95);
    padding: 40px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    max-width: 450px;
}

.map-overlay-content h3 {
    margin-bottom: 8px;
    font-size: 1.3rem;
}

.map-overlay-content p {
    font-size: 0.95rem;
    color: var(--color-primary-light);
    margin-bottom: 24px;
}

/* =============================================================
   20. FOOTER SECTION
   ============================================================= */
.footer {
    background-color: var(--color-primary);
    color: rgba(255,255,255,0.8);
    padding: 80px 0 30px 0;
    border-top: 1px solid rgba(255,255,255,0.08);
}

.footer-top-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 50px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 60px;
    margin-bottom: 40px;
}

.footer-col h3 {
    color: var(--color-white);
    font-size: 1.25rem;
    margin-bottom: 24px;
    position: relative;
    padding-bottom: 8px;
}

.footer-col h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--color-highlight);
    border-radius: var(--radius-full);
}

.brand-col .footer-logo {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
}

.brand-col .logo-icon {
    background: var(--gradient-gold);
    color: var(--color-primary);
}

.brand-col .logo-text {
    color: var(--color-white);
}

.brand-col .logo-text span {
    color: var(--color-highlight);
}

.brand-col p {
    font-size: 0.95rem;
    margin-bottom: 28px;
    line-height: 1.6;
}

.footer-socials {
    display: flex;
    gap: 14px;
}

.footer-socials a {
    width: 40px;
    height: 40px;
    background-color: rgba(255,255,255,0.06);
    border-radius: var(--radius-sm);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
    border: 1px solid rgba(255,255,255,0.1);
}

.footer-socials a:hover {
    background-color: var(--color-highlight);
    color: var(--color-primary);
    transform: translateY(-3px);
}

.links-col ul {
    list-style: none;
}

.links-col ul li {
    margin-bottom: 12px;
}

.links-col ul li a {
    font-size: 0.95rem;
    transition: var(--transition-fast);
}

.links-col ul li a:hover {
    color: var(--color-highlight);
    padding-left: 4px;
}

.contact-col p {
    font-size: 0.95rem;
    margin-bottom: 14px;
    display: flex;
    align-items: flex-start;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    font-size: 0.9rem;
}

.footer-bottom-links {
    display: flex;
    gap: 24px;
}

.footer-bottom-links a:hover {
    color: var(--color-highlight);
}

/* =============================================================
   21. FLOATING ACTION HELPERS
   ============================================================= */
.floating-whatsapp {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: #25d366;
    color: var(--color-white);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(37, 211, 102, 0.35);
    z-index: 990;
    transition: var(--transition-smooth);
    animation: whatsapp-pulse 2s infinite;
}

.floating-whatsapp:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5);
}

.whatsapp-tooltip {
    position: absolute;
    right: 75px;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 8px 16px;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-md);
    white-space: nowrap;
    opacity: 0;
    transform: translateX(10px);
    transition: var(--transition-smooth);
    pointer-events: none;
}

.floating-whatsapp:hover .whatsapp-tooltip {
    opacity: 1;
    transform: translateX(0);
}

.floating-call {
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 60px;
    height: 60px;
    background-color: var(--color-secondary);
    color: var(--color-white);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 25px rgba(30, 64, 175, 0.35);
    z-index: 990;
    transition: var(--transition-smooth);
    animation: call-pulse 2s infinite;
}

.floating-call:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 30px rgba(30, 64, 175, 0.5);
}

.call-tooltip {
    position: absolute;
    left: 75px;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 8px 16px;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-md);
    white-space: nowrap;
    opacity: 0;
    transform: translateX(-10px);
    transition: var(--transition-smooth);
    pointer-events: none;
}

.floating-call:hover .call-tooltip {
    opacity: 1;
    transform: translateX(0);
}

.back-to-top {
    position: fixed;
    bottom: 105px;
    left: 35px;
    width: 50px;
    height: 50px;
    background-color: var(--color-white);
    color: var(--color-primary);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    z-index: 990;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px);
    transition: var(--transition-smooth);
}

.back-to-top.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.back-to-top:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
    transform: scale(1.05);
}

/* =============================================================
   22. TRANSITIONS & GPU SCROLL REVEALS
   ============================================================= */
.reveal {
    opacity: 0;
    transform: translateY(30px) translateZ(0);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s;
}

.reveal-left {
    opacity: 0;
    transform: translateX(-40px) translateZ(0);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s;
}

.reveal-right {
    opacity: 0;
    transform: translateX(40px) translateZ(0);
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s;
}

.reveal.revealed,
.reveal-left.revealed,
.reveal-right.revealed {
    opacity: 1;
    transform: translate(0);
}

/* Pulse Keyframes */
@keyframes whatsapp-pulse {
    0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

@keyframes call-pulse {
    0% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(30, 64, 175, 0); }
    100% { box-shadow: 0 0 0 0 rgba(30, 64, 175, 0); }
}

/* =============================================================
   23. RESPONSIVE MEDIA BREAKPOINTS
   ============================================================= */

/* Large Desktop (> 1400px) */
@media (min-width: 1400px) {
    .container {
        max-width: 1320px;
    }
}

/* Desktop (< 1200px) */
@media (max-width: 1200px) {
    .features-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .subjects-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .faculty-grid {
        grid-template-columns: repeat(3, 1fr);
    }
    .gallery-grid-three {
        gap: 20px;
    }
}

/* Laptop (< 1024px) */
@media (max-width: 1024px) {
    .slide-grid-container {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        padding-top: 120px;
        align-content: center;
    }
    .slide-text-side {
        max-width: 100%;
        text-align: center;
        margin: 0 auto;
    }
    .slide-actions {
        justify-content: center;
    }
    .slide-image-side {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
    }
    .hero-visual-frame {
        max-width: 380px;
    }
    .highlights-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .highlights-section {
        margin-top: -30px;
    }
    .about-grid {
        grid-template-columns: 1fr;
        gap: 60px;
    }
    .about-image-column {
        max-width: 600px;
        margin: 0 auto;
    }
    .experience-badge-stamp {
        right: -10px;
    }
    .courses-grid {
        grid-template-columns: 1fr;
        max-width: 580px;
        margin: 0 auto;
    }
    .fees-grid {
        grid-template-columns: 1fr;
        max-width: 580px;
        margin: 0 auto;
    }
    .toppers-grid {
        grid-template-columns: 1fr;
        max-width: 480px;
        margin: 0 auto 50px auto;
    }
    .gallery-grid-three {
        grid-template-columns: repeat(2, 1fr);
    }
    .gallery-grid-three .gallery-item-three:nth-child(3) {
        grid-column: span 2;
        aspect-ratio: 21/9;
    }
    .testimonials-grid {
        grid-template-columns: 1fr;
        max-width: 580px;
        margin: 0 auto;
    }
    .form-wrapper-outer {
        grid-template-columns: 1fr;
    }
    .form-info-column {
        padding: 40px;
    }
    .form-fields-column {
        padding: 40px;
    }
    .contact-grid {
        grid-template-columns: 1fr;
    }
    .footer-top-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Tablet (< 768px) */
@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
    }
    
    .nav-menu {
        position: fixed;
        top: 80px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 80px);
        background-color: var(--color-white);
        flex-direction: column;
        align-items: center;
        padding: 40px 24px;
        gap: 24px;
        box-shadow: var(--shadow-lg);
        transition: var(--transition-smooth);
        overflow-y: auto;
        z-index: 999;
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-link {
        font-size: 1.15rem;
    }
    
    .mobile-only {
        display: flex;
        width: 100%;
    }
    
    .nav-actions .nav-call-btn,
    .nav-actions .nav-admission-btn {
        display: none;
    }
    
    .slide-actions {
        flex-direction: column;
        gap: 12px;
    }
    
    .slide-actions .btn {
        width: 100%;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .subjects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .faculty-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .form-row-2, .form-row-3 {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .timeline-line {
        left: 25px;
    }
    
    .timeline-icon {
        width: 50px;
        height: 50px;
        font-size: 1.15rem;
    }
    
    .timeline-step {
        gap: 16px;
    }
    
    .metrics-row {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}

/* Mobile (< 550px) */
@media (max-width: 550px) {
    .features-grid {
        grid-template-columns: 1fr;
    }
    
    .subjects-grid {
        grid-template-columns: 1fr;
    }
    
    .faculty-grid {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid-three {
        grid-template-columns: 1fr;
    }
    
    .gallery-grid-three .gallery-item-three:nth-child(3) {
        grid-column: span 1;
        aspect-ratio: 4/3;
    }
    
    .highlights-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-top-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }
    
    .footer-bottom-links {
        justify-content: center;
    }
}

/* Small Mobile (< 380px) */
@media (max-width: 380px) {
    .logo-text {
        font-size: 1.15rem;
    }
    .logo-icon {
        width: 38px;
        height: 38px;
        font-size: 1.3rem;
    }
    .experience-badge-stamp {
        position: static;
        width: 100%;
        margin-top: 20px;
    }
    .form-fields-column {
        padding: 24px;
    }
    .form-info-column {
        padding: 24px;
    }
    .faq-trigger {
        padding: 16px 20px;
        font-size: 1rem;
    }
    .floating-call {
        left: 20px;
        bottom: 20px;
        width: 50px;
        height: 50px;
    }
    .floating-whatsapp {
        right: 20px;
        bottom: 20px;
        width: 50px;
        height: 50px;
    }
    .back-to-top {
        left: 20px;
        bottom: 80px;
        width: 50px;
        height: 50px;
    }
}
