// Main Resume Application
class ResumeApp {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 6;
        this.isDarkMode = false;
        this.animationEnabled = true;
        this.resumeData = null;
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadResumeData();
            this.setupEventListeners();
            this.initializeAnimations();
            this.updateProgressBar();
            this.checkPrintMode();
        } catch (error) {
            console.error('Failed to initialize resume app:', error);
        }
    }
    
    async loadResumeData() {
        try {
            const response = await fetch('data/resume.json');
            this.resumeData = await response.json();
            console.log('Resume data loaded successfully:', this.resumeData);
        } catch (error) {
            console.error('Failed to load resume data:', error);
        }
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = parseInt(e.target.dataset.page);
                this.navigateToPage(page);
            });
        });
        
        // Theme toggle
        document.querySelector('.theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Export button
        document.querySelector('.export-btn').addEventListener('click', () => {
            this.exportToPDF();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' && this.currentPage < this.totalPages) {
                this.navigateToPage(this.currentPage + 1);
            } else if (e.key === 'ArrowLeft' && this.currentPage > 1) {
                this.navigateToPage(this.currentPage - 1);
            } else if (e.key === 'Home') {
                this.navigateToPage(1);
            } else if (e.key === 'End') {
                this.navigateToPage(this.totalPages);
            }
        });
        
        // Touch/swipe navigation for mobile
        this.setupSwipeNavigation();
        
        // Scroll animations
        this.setupScrollAnimations();
        
        // Print detection
        window.addEventListener('beforeprint', () => {
            this.prepareForPrint();
        });
        
        window.addEventListener('afterprint', () => {
            this.cleanupAfterPrint();
        });
        
        // Visibility change to optimize animations
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
        
        // Window resize handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }
    
    setupSwipeNavigation() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        const container = document.querySelector('.resume-container');
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, false);
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && this.currentPage < this.totalPages) {
                this.navigateToPage(this.currentPage + 1);
            } else if (diff < 0 && this.currentPage > 1) {
                this.navigateToPage(this.currentPage - 1);
            }
        }
    }
    
    navigateToPage(pageNumber) {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;
        
        // Hide current page
        document.querySelector(`.page-${this.currentPage}`).classList.remove('active');
        
        // Show new page
        setTimeout(() => {
            document.querySelector(`.page-${pageNumber}`).classList.add('active');
            this.updateNavigation(pageNumber);
            this.animatePageTransition(pageNumber);
        }, 300);
        
        this.currentPage = pageNumber;
        this.updateProgressBar();
        this.updateURL();
    }
    
    updateNavigation(pageNumber) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === pageNumber) {
                btn.classList.add('active');
            }
        });
    }
    
    animatePageTransition(pageNumber) {
        const newPage = document.querySelector(`.page-${pageNumber}`);
        const elements = newPage.querySelectorAll('.animate-on-scroll');
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }
    
    updateProgressBar() {
        const progress = (this.currentPage / this.totalPages) * 100;
        if (!document.querySelector('.page-progress')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'page-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${progress}%;
                height: 3px;
                background: linear-gradient(to right, var(--primary-color), var(--accent-color));
                transition: width 0.3s ease;
                z-index: 1001;
            `;
            document.body.appendChild(progressBar);
        } else {
            document.querySelector('.page-progress').style.width = `${progress}%`;
        }
    }
    
    updateURL() {
        const url = new URL(window.location);
        url.searchParams.set('page', this.currentPage);
        window.history.replaceState({}, '', url);
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save preference
        localStorage.setItem('resume-theme', this.isDarkMode ? 'dark' : 'light');
    }
    
    loadTheme() {
        const savedTheme = localStorage.getItem('resume-theme');
        if (savedTheme === 'dark') {
            this.toggleTheme();
        }
    }
    
    initializeAnimations() {
        // Initial page animations
        setTimeout(() => {
            this.animatePageTransition(1);
        }, 500);
        
        // Skill bar animations
        this.animateSkillBars();
        
        // Number counting animations
        this.animateNumbers();
        
        // Floating elements
        this.startFloatingAnimations();
    }
    
    animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress, .sub-skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width || bar.getAttribute('style').match(/width:\s*(\d+%)/)?.[1];
                        if (width) {
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 200);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.skill-card, .sub-skills-grid').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateNumbers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.highlight-number, .stat-number');
                    numbers.forEach(num => {
                        this.animateNumber(num);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.cover-highlights, .stats-grid').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateNumber(element) {
        const finalText = element.textContent;
        const number = parseInt(finalText.replace(/[^0-9]/g, ''));
        const suffix = finalText.replace(/[0-9]/g, '');
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                element.textContent = finalText;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }
    
    startFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.code-float');
        floatingElements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.5}s`;
        });
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
    
    exportToPDF() {
        window.print();
    }
    
    prepareForPrint() {
        // Pause all animations
        document.body.classList.add('printing');
        
        // Show all pages
        document.querySelectorAll('.resume-page').forEach(page => {
            page.classList.add('active');
        });
    }
    
    cleanupAfterPrint() {
        document.body.classList.remove('printing');
        
        // Show only current page
        document.querySelectorAll('.resume-page').forEach(page => {
            page.classList.remove('active');
        });
        document.querySelector(`.page-${this.currentPage}`).classList.add('active');
    }
    
    checkPrintMode() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('print') === 'true') {
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }
    
    handleResize() {
        // Adjust navigation for mobile
        const isMobile = window.innerWidth <= 768;
        const navigation = document.querySelector('.navigation');
        
        if (isMobile) {
            navigation.style.position = 'relative';
            navigation.style.transform = 'none';
        } else {
            navigation.style.position = 'fixed';
            navigation.style.transform = 'translateX(-50%)';
        }
    }
    
    pauseAnimations() {
        this.animationEnabled = false;
        document.querySelectorAll('.code-float').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }
    
    resumeAnimations() {
        this.animationEnabled = true;
        document.querySelectorAll('.code-float').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
    
    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.resumeApp = new ResumeApp();
    
    // Load saved theme
    window.resumeApp.loadTheme();
    
    // Check for page parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = parseInt(urlParams.get('page'));
    if (pageParam && pageParam >= 1 && pageParam <= 6) {
        window.resumeApp.navigateToPage(pageParam);
    }
});

// Prevent accidental navigation
window.addEventListener('beforeunload', (e) => {
    if (window.resumeApp && window.resumeApp.currentPage > 1) {
        e.preventDefault();
        e.returnValue = '';
    }
});