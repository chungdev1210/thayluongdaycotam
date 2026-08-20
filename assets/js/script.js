/**
 * Duy Phú Dạy Lái Xe - Interactive JavaScript
 * Modern, responsive driving school website
 */

// ===== GLOBAL VARIABLES =====
let isLoading = true;
let navbar = null;
let mobileMenuBtn = null;
let navLinks = null;
let backToTopBtn = null;
let mobileNavOverlay = null;
let lastScrollY = 0;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeElements();
    initializeLoading();
    createLoadingParticles();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeBackToTop();
    initializeIntersectionObserver();
    initializeContactTracking();
    
    // Hide loading screen after initialization with realistic timing
    setTimeout(() => {
        hideLoadingScreen();
    }, 2800);
});

// ===== ELEMENT INITIALIZATION =====
function initializeElements() {
    navbar = document.getElementById('navbar');
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    navLinks = document.getElementById('navLinks');
    backToTopBtn = document.getElementById('backToTop');
    mobileNavOverlay = document.getElementById('mobileNavOverlay');
}

// ===== LOADING SCREEN =====
function initializeLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Animate loading elements sequentially
    const logoIcon = loadingScreen.querySelector('.logo-icon');
    const logoText = loadingScreen.querySelector('.logo-text');
    const loadingAnimation = loadingScreen.querySelector('.loading-animation');
    const loadingText = loadingScreen.querySelector('.loading-text');
    const progressBar = loadingScreen.querySelector('.progress-bar');
    
    // Animate logo entrance
    setTimeout(() => {
        if (logoIcon) {
            logoIcon.style.opacity = '0';
            logoIcon.style.transform = 'scale(0.5) rotate(-180deg)';
            logoIcon.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            logoIcon.style.opacity = '1';
            logoIcon.style.transform = 'scale(1) rotate(0deg)';
        }
    }, 200);
    
    // Animate logo text
    setTimeout(() => {
        if (logoText) {
            logoText.style.opacity = '0';
            logoText.style.transform = 'translateY(30px)';
            logoText.style.transition = 'all 0.6s ease-out';
            logoText.style.opacity = '1';
            logoText.style.transform = 'translateY(0)';
        }
    }, 600);
    
    // Animate loading animation elements
    setTimeout(() => {
        if (loadingAnimation) {
            loadingAnimation.style.opacity = '0';
            loadingAnimation.style.transform = 'scale(0.8)';
            loadingAnimation.style.transition = 'all 0.5s ease-out';
            loadingAnimation.style.opacity = '1';
            loadingAnimation.style.transform = 'scale(1)';
        }
    }, 1000);
    
    // Animate loading text
    setTimeout(() => {
        if (loadingText) {
            loadingText.style.opacity = '0';
            loadingText.style.transform = 'translateY(20px)';
            loadingText.style.transition = 'all 0.4s ease-out';
            loadingText.style.opacity = '1';
            loadingText.style.transform = 'translateY(0)';
        }
    }, 1200);
    
    // Simulate loading progress
    simulateLoadingProgress();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Add exit animations before hiding
    const loadingContent = loadingScreen.querySelector('.loading-content');
    if (loadingContent) {
        loadingContent.style.transition = 'all 0.6s ease-in';
        loadingContent.style.transform = 'scale(0.9) translateY(-20px)';
        loadingContent.style.opacity = '0.8';
    }
    
    // Hide loading screen with enhanced animation
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Trigger entrance animations for main content
        setTimeout(() => {
            triggerEntranceAnimations();
        }, 200);
    }, 400);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    if (!mobileMenuBtn) return;
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links (both desktop and mobile)
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
}

function toggleMobileMenu() {
    if (!mobileMenuBtn || !mobileNavOverlay) return;
    
    const isActive = mobileNavOverlay.classList.contains('active');
    
    if (isActive) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    if (!mobileMenuBtn || !mobileNavOverlay) return;
    
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', 'Đóng menu');
    mobileNavOverlay.classList.add('active');
    mobileNavOverlay.inert = false;
    document.body.style.overflow = 'hidden';
    
    // Reset and animate mobile nav links
    const mobileNavLinks = mobileNavOverlay.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link, index) => {
        link.style.transform = 'translateX(-100px)';
        link.style.opacity = '0';
        link.style.animation = 'none';
        
        setTimeout(() => {
            link.style.animation = `slideInLeft 0.6s ease-out forwards`;
            link.style.animationDelay = `${0.1 + index * 0.05}s`;
        }, 50);
    });
    
    // Animate CTA button
    const mobileCTA = mobileNavOverlay.querySelector('.mobile-nav-cta');
    if (mobileCTA) {
        mobileCTA.style.transform = 'translateY(100px)';
        mobileCTA.style.opacity = '0';
        mobileCTA.style.animation = 'none';
        
        setTimeout(() => {
            mobileCTA.style.animation = 'slideInUp 0.6s ease-out 0.4s forwards';
        }, 50);
    }
}

function closeMobileMenu() {
    if (!mobileMenuBtn || !mobileNavOverlay) return;
    
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Mở menu');
    mobileNavOverlay.classList.remove('active');
    mobileNavOverlay.inert = true;
    document.body.style.overflow = '';
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Remove active class from all nav links (both desktop and mobile)
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current nav links (both desktop and mobile)
                const currentNavLinks = document.querySelectorAll(`.nav-link[href="#${currentId}"], .mobile-nav-link[href="#${currentId}"]`);
                currentNavLinks.forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', throttle(handleScroll, 10));
}

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Navbar scroll effects
    handleNavbarScroll(currentScrollY);
    
    // Back to top button
    handleBackToTopButton(currentScrollY);
    
    // Parallax effects
    handleParallaxEffects(currentScrollY);
    
    lastScrollY = currentScrollY;
}

function handleNavbarScroll(scrollY) {
    if (!navbar) return;
    
    // Tính toán độ trong suốt dựa trên vị trí scroll
    const maxScroll = 300; // Điểm scroll tối đa để đạt độ trong suốt tối đa
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    
    // Áp dụng các class dựa trên mức độ scroll
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (scrollY > 150) {
        navbar.classList.add('scrolled-more');
    } else {
        navbar.classList.remove('scrolled-more');
    }
    
    // Hiệu ứng ẩn/hiện navbar khi scroll
    if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Thêm hiệu ứng độ trong suốt mượt mà
    const baseOpacity = 0.25;
    const maxOpacity = 0.5;
    const currentOpacity = baseOpacity + (scrollProgress * (maxOpacity - baseOpacity));
    
    // Áp dụng độ trong suốt trực tiếp nếu cần
    if (scrollY > 0 && scrollY < 50) {
        navbar.style.background = `rgba(255, 255, 255, ${currentOpacity})`;
    } else {
        navbar.style.background = '';
    }
}

function handleBackToTopButton(scrollY) {
    if (!backToTopBtn) return;
    
    if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

function handleParallaxEffects(scrollY) {
    // Hero parallax
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    // Floating elements parallax
    const floatingElements = document.querySelectorAll('.float-item');
    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translate(${Math.sin(scrollY * 0.01) * 10}px, ${scrollY * speed}px)`;
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    initializeCounterAnimations();
}

function triggerEntranceAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animation = 'fadeInUp 0.8s ease-out forwards';
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }, index * 200);
    });
    
    // Animate navbar
    if (navbar) {
        navbar.style.animation = 'fadeInDown 0.6s ease-out forwards';
    }
}

function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const suffix = element.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success feedback
        showNotification('success', 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Track contact form submission
        trackEvent('contact_form_submit', {
            license_type: data.license,
            name: data.name
        });
        
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    clearFieldError({ target: field });
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'Trường này là bắt buộc';
        isValid = false;
    }
    
    // Phone number validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            errorMessage = 'Số điện thoại không hợp lệ';
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    
    // Create error message element
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Track navigation clicks
                trackEvent('navigation_click', {
                    target: targetId
                });
            }
        });
    });
}

// ===== BACK TO TOP =====
function initializeBackToTop() {
    if (!backToTopBtn) return;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        trackEvent('back_to_top_click');
    });
}

// ===== INTERSECTION OBSERVER =====
function initializeIntersectionObserver() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Use the existing AOS data attributes without adding an external dependency.
    const animateElements = document.querySelectorAll('[data-aos]');
    
    animateElements.forEach(element => {
        const delay = Math.max(0, Number.parseInt(element.dataset.aosDelay, 10) || 0);
        const duration = Math.max(300, Number.parseInt(element.dataset.aosDuration, 10) || 900);

        element.style.setProperty('--aos-delay', `${delay}ms`);
        element.style.setProperty('--aos-duration', `${duration}ms`);
        element.classList.add('aos-pending');

        element.addEventListener('animationend', (event) => {
            if (event.target !== element || event.animationName !== 'fade-in-up') return;
            element.classList.remove('aos-pending', 'animate-in');
            element.classList.add('aos-shown');
        }, { once: true });

        observer.observe(element);
    });
}

// ===== CONTACT TRACKING =====
function initializeContactTracking() {
    // Track phone calls
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            const phoneNumber = link.getAttribute('href').replace('tel:', '');
            trackEvent('phone_call', {
                phone_number: phoneNumber
            });
        });
    });
    
    // Track Zalo clicks
    const zaloLinks = document.querySelectorAll('a[href*="zalo.me"]');
    zaloLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('zalo_click');
        });
    });
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-btn-horizontal');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.classList.contains('tiktok') ? 'TikTok' : 'Facebook';
            trackEvent('social_media_click', {
                platform: platform
            });
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function trackEvent(eventName, parameters = {}) {
    
    // Example: Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Example: Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
}

function showNotification(type, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== EVENT LISTENERS =====
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Recalculate scroll positions
    handleScroll();
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('❌ JavaScript Error:', e.error);
});

// ===== LOADING PROGRESS SIMULATION =====
function simulateLoadingProgress() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        
        progressBar.style.width = `${progress}%`;
    }, 200);
}

// ===== ENHANCED LOADING ANIMATIONS =====
function createLoadingParticles() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: 1;
        `;
        loadingScreen.appendChild(particle);
    }
}

// Add particle animation to CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-30px) translateX(20px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);
