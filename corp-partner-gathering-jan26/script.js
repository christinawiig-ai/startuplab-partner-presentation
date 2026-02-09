// StartupLab Corporate Partner Gathering - January 2026
// Presentation Navigation & Animations

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
        this.setupVideoControls();
        this.updateSlideCounter();
        this.updateProgressBar();

        // Animate first slide
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
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Only handle horizontal swipes
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX < 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });

        // Click on slide content to advance (optional)
        document.querySelector('.presentation-container').addEventListener('click', (e) => {
            // Don't advance if clicking on interactive elements
            if (e.target.closest('a, button, input, .nav-controls')) return;

            // Click on right half advances, left half goes back
            const clickX = e.clientX;
            const windowWidth = window.innerWidth;

            if (clickX > windowWidth * 0.7) {
                this.nextSlide();
            } else if (clickX < windowWidth * 0.3) {
                this.previousSlide();
            }
        });
    }

    nextSlide() {
        if (this.isAnimating) return;

        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.isAnimating) return;

        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (this.isAnimating || slideNumber === this.currentSlide) return;
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;

        this.isAnimating = true;

        const currentSlideElement = document.querySelector('.slide.active');
        const targetSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);

        if (!targetSlideElement) {
            this.isAnimating = false;
            return;
        }

        // Direction class for animation
        const direction = slideNumber > this.currentSlide ? 'next' : 'prev';

        // Update current slide
        this.currentSlide = slideNumber;

        // Remove classes and add new ones
        this.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });

        if (direction === 'next') {
            currentSlideElement.classList.add('prev');
        }

        targetSlideElement.classList.add('active');

        // Handle videos - play only on active slide, pause others
        const fullscreenVideo = document.querySelector('.fullscreen-video');
        if (fullscreenVideo) {
            if (slideNumber === 3) {
                fullscreenVideo.play().catch(() => {});
            } else {
                fullscreenVideo.pause();
            }
        }

        const slideVideo = document.querySelector('[data-slide="26"] .slide-video');
        if (slideVideo) {
            if (slideNumber === 26) {
                slideVideo.play().catch(() => {});
            } else {
                slideVideo.pause();
            }
        }

        // Update UI
        this.updateSlideCounter();
        this.updateProgressBar();

        // Animate content
        setTimeout(() => {
            this.animateSlideContent(slideNumber);
        }, 200);

        // Reset animation lock
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
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

        // Text elements - fade up
        const textElements = slide.querySelectorAll(
            'h1, h2, h3, .tagline, .subtitle, .lead-text, .lead-text-large, ' +
            '.program-label, .feature-label, .feature-label-large, ' +
            '.case-badge, .new-badge, .offering-badge, .section-label, ' +
            '.case-subtitle, .partner-label, .date-label'
        );

        // Card/block elements - fade up with slightly more travel
        const cardElements = slide.querySelectorAll(
            '.agenda-item, .team-member, .team-card, .big-stat, .highlight-item, ' +
            '.program-card, .program-visual-card, .feature-item, .event-item, ' +
            '.option-card, .offering-item, .offering-tag, .case-stat, .pillar, ' +
            '.recap-card, .summit-card, .nordic-card, .competence-areas .tag, ' +
            '.case-insight, .upcoming-callout, .big-impact, ' +
            '.offering-details, .benefits, .how-it-works, .eir-services, ' +
            '.core-pillars, .nordic-description-box'
        );

        // Visual elements - fade in (no vertical movement)
        const visualElements = slide.querySelectorAll(
            '.slide-photo, .slide-photo-half, .slide-photo-quarter, .grid-photo, ' +
            '.board-photo-container, .photo-side, ' +
            '.sponsor-logos-row, .partner-logos-bottom, .partner-logos-inline, ' +
            '.summit-logo-row, .logo-partnership, .video-frame, ' +
            '.contact-content, .closing-logo, .hero-logo'
        );

        // Animate text first
        textElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';

            setTimeout(() => {
                el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 50 + (index * 50));
        });

        // Animate cards with offset
        const textDelay = Math.min(textElements.length * 50, 200);
        cardElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';

            setTimeout(() => {
                el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, textDelay + 30 + (index * 45));
        });

        // Animate visuals - smooth fade, no vertical shift
        const cardDelay = textDelay + Math.min(cardElements.length * 45, 150);
        visualElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.98)';

            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            }, cardDelay + (index * 60));
        });
    }

    setupVideoControls() {
        const playBtn = document.querySelector('.video-play-btn');
        const video = document.querySelector('.fullscreen-video');
        if (!playBtn || !video) return;

        const pauseIcon = '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        const playIcon = '<svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32"><polygon points="5,3 19,12 5,21"/></svg>';

        playBtn.innerHTML = pauseIcon;
        playBtn.classList.add('playing');

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (video.paused) {
                video.play();
                playBtn.innerHTML = pauseIcon;
                playBtn.classList.add('playing');
            } else {
                video.pause();
                playBtn.innerHTML = playIcon;
                playBtn.classList.remove('playing');
            }
        });

        // Mute/unmute buttons for all videos
        document.querySelectorAll('.video-mute-btn').forEach(muteBtn => {
            muteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetVideo = muteBtn.closest('.video-slide, .madlab-video-side')?.querySelector('video');
                if (!targetVideo) return;

                targetVideo.muted = !targetVideo.muted;
                const iconMuted = muteBtn.querySelector('.icon-muted');
                const iconUnmuted = muteBtn.querySelector('.icon-unmuted');
                if (targetVideo.muted) {
                    iconMuted.style.display = '';
                    iconUnmuted.style.display = 'none';
                } else {
                    iconMuted.style.display = 'none';
                    iconUnmuted.style.display = '';
                }
            });
        });
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Fullscreen error: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Public API
    getCurrentSlide() {
        return this.currentSlide;
    }

    getTotalSlides() {
        return this.totalSlides;
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.presentation = new StartupLabPresentation();

    // Add loaded class for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log(`StartupLab Presentation loaded: ${window.presentation.getTotalSlides()} slides`);
});

// Keyboard shortcuts help
const showHelp = () => {
    console.log(`
Keyboard Shortcuts:
  Arrow keys / Space - Navigate slides
  F - Toggle fullscreen
  Home - First slide
  End - Last slide
  Esc - Exit fullscreen

Touch:
  Swipe left/right - Navigate slides

Click:
  Right side - Next slide
  Left side - Previous slide
    `);
};
