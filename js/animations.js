// Animation Controller
class AnimationController {
    constructor(app) {
        this.app = app;
        this.isAnimating = true;
        this.animationQueue = [];
        this.intersectionObservers = new Map();
        this.rafCallbacks = new Set();
        
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupSkillAnimations();
        this.setupNumberAnimations();
        this.setupFloatingElements();
        this.setupPageTransitions();
        this.setupHoverAnimations();
        this.setupMicroInteractions();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    const progress = entry.intersectionRatio;
                    this.updateScrollProgress(element, progress);
                    
                    if (progress > 0.1) {
                        element.classList.add('visible');
                        this.triggerCustomAnimation(element);
                    }
                } else {
                    element.classList.remove('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            scrollObserver.observe(element);
            this.intersectionObservers.set('scroll', scrollObserver);
        });
    }
    
    updateScrollProgress(element, progress) {
        const masks = element.querySelectorAll('.progress-mask');
        masks.forEach(mask => {
            mask.style.transform = `scaleY(${progress})`;
        });
        
        const parallaxElements = element.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed || 0.5);
            const yPos = -(progress * speed * 100);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    triggerCustomAnimation(element) {
        const animationType = element.dataset.animation;
        if (!animationType) return;
        
        switch (animationType) {
            case 'fade-in-up':
                this.animateFadeInUp(element);
                break;
            case 'slide-in-left':
                this.animateSlideInLeft(element);
                break;
            case 'slide-in-right':
                this.animateSlideInRight(element);
                break;
            case 'scale-in':
                this.animateScaleIn(element);
                break;
            case 'rotate-in':
                this.animateRotateIn(element);
                break;
            case 'typewriter':
                this.animateTypewriter(element);
                break;
        }
    }
    
    setupSkillAnimations() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.skill-card, .sub-skills-grid').forEach(element => {
            skillObserver.observe(element);
            this.intersectionObservers.set('skills', skillObserver);
        });
    }
    
    animateSkillBars(container) {
        const progressBars = container.querySelectorAll('.skill-progress, .sub-skill-progress');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.style.width || bar.getAttribute('data-width');
            const targetValue = parseFloat(targetWidth) || 0;
            
            setTimeout(() => {
                this.animateProgress(bar, 0, targetValue, 1500);
                
                // Add pulse effect when complete
                setTimeout(() => {
                    bar.parentElement.classList.add('pulse-once');
                    setTimeout(() => {
                        bar.parentElement.classList.remove('pulse-once');
                    }, 600);
                }, 1500);
            }, index * 200);
        });
        
        // Animate skill icons
        const icons = container.querySelectorAll('.skill-icon');
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('bounce');
                setTimeout(() => {
                    icon.classList.remove('bounce');
                }, 1000);
            }, index * 100);
        });
    }
    
    animateProgress(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentWidth = start + (end - start) * easeOutQuart;
            
            element.style.width = `${currentWidth}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setupNumberAnimations() {
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumbers(entry.target);
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.highlight-number, .stat-number').forEach(element => {
            numberObserver.observe(element);
            this.intersectionObservers.set('numbers', numberObserver);
        });
    }
    
    animateNumbers(container) {
        const numbers = container.querySelectorAll('.highlight-number, .stat-number');
        
        numbers.forEach((numberEl, index) => {
            const finalText = numberEl.textContent;
            const number = parseInt(finalText.replace(/[^0-9]/g, ''));
            const suffix = finalText.replace(/[0-9]/g, '');
            
            setTimeout(() => {
                this.animateCountUp(numberEl, 0, number, suffix, 2000);
            }, index * 200);
        });
    }
    
    animateCountUp(element, start, end, suffix, duration) {
        const startTime = performance.now();
        const isDecimal = end < 10 && end > 0;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            
            if (isDecimal) {
                element.textContent = current.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            
            // Add highlight effect at the end
            if (progress >= 1) {
                element.classList.add('count-animation');
                setTimeout(() => {
                    element.classList.remove('count-animation');
                }, 600);
            } else {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.code-float');
        
        floatingElements.forEach((element, index) => {
            // Set initial random position and animation
            this.randomizeFloatAnimation(element, index);
            
            // Add hover effect
            element.addEventListener('mouseenter', () => {
                this.pauseFloatAnimation(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resumeFloatAnimation(element);
            });
        });
        
        // Create additional floating particles
        this.createFloatingParticles();
    }
    
    randomizeFloatAnimation(element, index) {
        const animations = ['float', 'pulse', 'rotate-slow'];
        const randomAnimation = animations[index % animations.length];
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 4;
        
        element.style.animation = `${randomAnimation} ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    }
    
    pauseFloatAnimation(element) {
        element.style.animationPlayState = 'paused';
        this.transformElement(element, 'scale(1.2)');
    }
    
    resumeFloatAnimation(element) {
        element.style.animationPlayState = 'running';
        this.transformElement(element, 'scale(1)');
    }
    
    createFloatingParticles() {
        const coverPage = document.querySelector('.page-cover');
        if (!coverPage) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${2 + Math.random() * 4}px;
                height: ${2 + Math.random() * 4}px;
                background: rgba(255, 255, 255, ${0.1 + Math.random() * 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite;
            `;
            particlesContainer.appendChild(particle);
        }
        
        coverPage.querySelector('.cover-bg').appendChild(particlesContainer);
    }
    
    setupPageTransitions() {
        // Add transition classes to pages
        document.querySelectorAll('.resume-page').forEach(page => {
            page.addEventListener('animationend', (e) => {
                if (e.animationName === 'slideInFromTop') {
                    this.triggerPageLoadAnimations(page);
                }
            });
        });
    }
    
    triggerPageLoadAnimations(page) {
        const pageType = page.dataset.page;
        
        switch (pageType) {
            case '1':
                this.animateCoverPage(page);
                break;
            case '3':
                this.animateSkillsPage(page);
                break;
            case '6':
                this.animateStatsPage(page);
                break;
        }
    }
    
    animateCoverPage(page) {
        const elements = page.querySelectorAll('.cover-content > *');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    animateSkillsPage(page) {
        const cards = page.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-fade-in');
            }, index * 150);
        });
    }
    
    animateStatsPage(page) {
        const cards = page.querySelectorAll('.achievement-card, .stat-item');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-fade-in');
            }, index * 100);
        });
    }
    
    setupHoverAnimations() {
        // Card hover effects
        document.querySelectorAll('.skill-card, .project-card, .achievement-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.target, true);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateCardHover(e.target, false);
            });
        });
        
        // Button hover effects
        document.querySelectorAll('.nav-btn, .theme-toggle, .export-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.animateButtonHover(btn, true);
            });
            
            btn.addEventListener('mouseleave', () => {
                this.animateButtonHover(btn, false);
            });
        });
    }
    
    animateCardHover(card, isHovering) {
        if (isHovering) {
            card.classList.add('hover-glow');
            this.transformElement(card, 'translateY(-8px) scale(1.02)');
            
            // Animate inner elements
            const innerElements = card.querySelectorAll('h3, h4');
            innerElements.forEach(el => {
                el.style.color = 'var(--primary-color)';
            });
        } else {
            card.classList.remove('hover-glow');
            this.transformElement(card, 'translateY(0) scale(1)');
            
            // Reset inner elements
            const innerElements = card.querySelectorAll('h3, h4');
            innerElements.forEach(el => {
                el.style.color = '';
            });
        }
    }
    
    animateButtonHover(button, isHovering) {
        if (isHovering) {
            this.transformElement(button, 'scale(1.1)');
            button.classList.add('shine-effect');
        } else {
            this.transformElement(button, 'scale(1)');
            button.classList.remove('shine-effect');
        }
    }
    
    setupMicroInteractions() {
        // Click feedback
        document.addEventListener('click', (e) => {
            this.createClickRipple(e);
        });
        
        // Loading animations for dynamic content
        this.setupLoadingAnimations();
        
        // Focus animations
        document.addEventListener('focusin', (e) => {
            this.animateFocus(e.target, true);
        });
        
        document.addEventListener('focusout', (e) => {
            this.animateFocus(e.target, false);
        });
    }
    
    createClickRipple(e) {
        if (e.target.closest('button, .nav-btn, .clickable')) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = e.target.getBoundingClientRect();
            const size = 20;
            
            ripple.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(37, 99, 235, 0.3);
                left: ${e.clientX - size / 2}px;
                top: ${e.clientY - size / 2}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out forwards;
                z-index: 9999;
            `;
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    }
    
    setupLoadingAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .ripple {
                animation: ripple 0.6s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    animateFocus(element, hasFocus) {
        if (hasFocus) {
            element.classList.add('focus-glow');
            this.transformElement(element, 'scale(1.02)');
        } else {
            element.classList.remove('focus-glow');
            this.transformElement(element, 'scale(1)');
        }
    }
    
    // Utility animation methods
    animateFadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateSlideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }
    
    animateSlideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }
    
    animateScaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 100);
    }
    
    animateRotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        }, 100);
    }
    
    animateTypewriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let charIndex = 0;
        const typeWriter = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                element.classList.remove('typing-effect');
            }
        };
        
        element.classList.add('typing-effect');
        setTimeout(typeWriter, 500);
    }
    
    transformElement(element, transform) {
        element.style.transform = transform;
        element.style.transition = 'transform 0.3s ease';
    }
    
    pauseAllAnimations() {
        this.isAnimating = false;
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    resumeAllAnimations() {
        this.isAnimating = true;
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    destroy() {
        // Clean up observers
        this.intersectionObservers.forEach(observer => {
            observer.disconnect();
        });
        
        // Cancel RAF callbacks
        this.rafCallbacks.forEach(callback => {
            cancelAnimationFrame(callback);
        });
    }
}