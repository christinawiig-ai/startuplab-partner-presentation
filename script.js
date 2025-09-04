// StartupLab Web Presentation JavaScript
// Interactive navigation and animations

class StartupLabPresentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = document.querySelectorAll('.slide').length;
        this.slides = document.querySelectorAll('.slide');
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateSlideCounter();
        this.updateProgressBar();
        this.addAnimationClasses();
        
        // Auto-start animations for the first slide
        setTimeout(() => {
            this.animateSlideContent(1);
        }, 300);
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prev-btn').addEventListener('click', () => this.previousSlide());
        document.getElementById('next-btn').addEventListener('click', () => this.nextSlide());
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isAnimating) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
                case 'f':
                case 'F':
                    this.toggleFullscreen();
                    break;
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (this.isAnimating) return;
            
            const swipeDistance = Math.abs(touchEndX - touchStartX);
            const minSwipeDistance = 50;
            
            if (swipeDistance > minSwipeDistance) {
                if (touchEndX < touchStartX) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else if (touchEndX > touchStartX) {
                    // Swipe right - previous slide
                    this.previousSlide();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
        
        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Prevent default behaviors that might interfere
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        } else {
            // Loop back to first slide
            this.goToSlide(1);
        }
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        } else {
            // Loop to last slide
            this.goToSlide(this.totalSlides);
        }
    }
    
    goToSlide(slideNumber) {
        if (this.isAnimating || slideNumber === this.currentSlide) return;
        
        this.isAnimating = true;
        
        // Remove active class from current slide
        const currentSlideElement = document.querySelector('.slide.active');
        const targetSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
        
        if (!targetSlideElement) return;
        
        // Add transition classes
        if (slideNumber > this.currentSlide) {
            currentSlideElement.classList.add('prev');
        }
        
        // Update current slide
        this.currentSlide = slideNumber;
        
        // Update active slide
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        
        targetSlideElement.classList.add('active');
        
        // Update UI
        this.updateSlideCounter();
        this.updateProgressBar();
        
        // Animate slide content
        setTimeout(() => {
            this.animateSlideContent(slideNumber);
        }, 300);
        
        // Reset animation lock
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    updateSlideCounter() {
        const counter = document.getElementById('slide-counter');
        counter.textContent = `${this.currentSlide} / ${this.totalSlides}`;
    }
    
    updateProgressBar() {
        const progressFill = document.querySelector('.progress-fill');
        const progress = (this.currentSlide / this.totalSlides) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    animateSlideContent(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (!slide) return;
        
        // Remove existing animation classes
        slide.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            el.classList.remove('fade-in', 'slide-in-left', 'slide-in-right');
        });
        
        // Add animation classes based on slide type
        const animateElements = (elements, animationClass, delay = 0) => {
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add(animationClass);
                }, delay + (index * 100));
            });
        };
        
        // Animate different slide types
        switch(slideNumber) {
            case 1: // Hero slide
                setTimeout(() => {
                    const logo = slide.querySelector('.startup-logo');
                    const tagline = slide.querySelector('.tagline');
                    if (logo) logo.classList.add('slide-in-left');
                    if (tagline) setTimeout(() => tagline.classList.add('fade-in'), 300);
                }, 100);
                break;
                
            case 2: // About slide
                const statBoxes = slide.querySelectorAll('.stat-box');
                const locationBadges = slide.querySelectorAll('.location-badge');
                animateElements(statBoxes, 'fade-in', 200);
                setTimeout(() => {
                    animateElements(locationBadges, 'slide-in-left', 100);
                }, 600);
                break;
                
            case 3: // Agenda slide
                const agendaItems = slide.querySelectorAll('.agenda-item');
                animateElements(agendaItems, 'slide-in-right', 200);
                break;
                
            case 4: // Program slide
                const scheduleItems = slide.querySelectorAll('.schedule-item');
                animateElements(scheduleItems, 'fade-in', 200);
                break;
                
            case 5: // Image grid slide
                const gridImages = slide.querySelectorAll('.grid-image');
                animateElements(gridImages, 'fade-in', 300);
                break;
                
            case 6: // Statistics slide
                const statItems = slide.querySelectorAll('.stat-item');
                animateElements(statItems, 'slide-in-right', 200);
                break;
                
            case 7: // Timeline slide
                const timelineItems = slide.querySelectorAll('.timeline-item');
                animateElements(timelineItems, 'slide-in-right', 200);
                break;
                
            case 10: // Ecosystem slide
                const ecosystemCards = slide.querySelectorAll('.ecosystem-card');
                animateElements(ecosystemCards, 'fade-in', 200);
                break;
                
            case 11: // Industry programs slide
                const programCards = slide.querySelectorAll('.program-card');
                animateElements(programCards, 'slide-in-right', 150);
                break;
                
            case 12: // Partnership slide
                const partnershipTypes = slide.querySelectorAll('.partnership-type');
                const networkNodes = slide.querySelectorAll('.network-node');
                animateElements(partnershipTypes, 'slide-in-left', 200);
                setTimeout(() => {
                    animateElements(networkNodes, 'fade-in', 100);
                }, 800);
                break;
                
            case 13: // Success stories slide
                const successCards = slide.querySelectorAll('.success-card');
                animateElements(successCards, 'fade-in', 300);
                break;
                
            default:
                // Default fade-in for other slides
                const defaultElements = slide.querySelectorAll('h1, h2, h3, p, .main-text');
                animateElements(defaultElements, 'fade-in', 100);
        }
    }
    
    addAnimationClasses() {
        // Add animation classes to elements that should be animated
        this.slides.forEach((slide, slideIndex) => {
            const elements = slide.querySelectorAll('h1, h2, h3, p, .agenda-item, .schedule-item, .grid-image, .stat-item, .timeline-item');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            });
        });
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    handleResize() {
        // Handle responsive adjustments if needed
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        
        document.body.classList.toggle('mobile', isMobile);
        document.body.classList.toggle('tablet', isTablet);
    }
    
    // Public API methods
    getCurrentSlide() {
        return this.currentSlide;
    }
    
    getTotalSlides() {
        return this.totalSlides;
    }
    
    // Auto-advance functionality (optional)
    startAutoAdvance(intervalMs = 10000) {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
        }
        
        this.autoAdvanceTimer = setInterval(() => {
            this.nextSlide();
        }, intervalMs);
    }
    
    stopAutoAdvance() {
        if (this.autoAdvanceTimer) {
            clearInterval(this.autoAdvanceTimer);
            this.autoAdvanceTimer = null;
        }
    }
}

// Additional utility functions
const utils = {
    // Smooth scroll to element
    scrollToElement(element, duration = 500) {
        const start = window.pageYOffset;
        const target = element.getBoundingClientRect().top + start;
        const distance = target - start;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        requestAnimationFrame(animation);
    },
    
    // Easing function for smooth animations
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    },
    
    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },
    
    // Device detection
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
};

// Enhanced keyboard shortcuts
const keyboardShortcuts = {
    // Toggle presentation mode
    'p': () => {
        document.body.classList.toggle('presentation-mode');
    },
    
    // Toggle dark/light mode (if implemented)
    't': () => {
        document.body.classList.toggle('light-theme');
    },
    
    // Reset to first slide
    'r': () => {
        if (window.presentation) {
            window.presentation.goToSlide(1);
        }
    }
};

// Performance monitoring
const performance = {
    start: performance.now(),
    
    mark(name) {
        console.log(`${name}: ${performance.now() - this.start}ms`);
    },
    
    // Monitor slide transition performance
    monitorTransitions() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.addEventListener('transitionstart', () => {
                this.transitionStart = performance.now();
            });
            
            slide.addEventListener('transitionend', () => {
                if (this.transitionStart) {
                    console.log(`Slide transition: ${performance.now() - this.transitionStart}ms`);
                }
            });
        });
    }
};

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create presentation instance
    window.presentation = new StartupLabPresentation();
    
    // Add body classes for feature detection
    document.body.classList.toggle('touch', utils.isTouch());
    document.body.classList.toggle('mobile', utils.isMobile());
    
    // Initialize performance monitoring
    performance.monitorTransitions();
    
    // Add additional keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (keyboardShortcuts[e.key]) {
            e.preventDefault();
            keyboardShortcuts[e.key]();
        }
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            window.presentation.stopAutoAdvance();
        }
    });
    
    // Add loading complete class for any CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    console.log('StartupLab Presentation initialized successfully');
    console.log(`Total slides: ${window.presentation.getTotalSlides()}`);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StartupLabPresentation, utils };
}
