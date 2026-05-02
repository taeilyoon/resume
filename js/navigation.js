// Navigation Controller
class NavigationController {
    constructor(app) {
        this.app = app;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isNavigating = false;
        this.navigationHistory = [];
        this.maxHistorySize = 10;
        
        this.init();
    }
    
    init() {
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupMouseNavigation();
        this.setupWheelNavigation();
        this.updateNavigationIndicators();
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isNavigating) return;
            
            switch(e.key) {
                case 'ArrowRight':
                e.preventDefault();
                    this.navigateNext();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigatePrev();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateToPage(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.navigateToPage(6);
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.navigateToPage(parseInt(e.key));
                    }
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.app.exportToPDF();
                    }
                    break;
                case 't':
                case 'T':
                    if (!e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        this.app.toggleTheme();
                    }
                    break;
            }
        });
    }
    
    setupTouchNavigation() {
        let touchStartTime = 0;
        
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            touchStartTime = Date.now();
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // Only handle quick swipes
            if (touchDuration < 300) {
                this.handleSwipe();
            }
        }, { passive: true });
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.navigateNext();
            } else {
                this.navigatePrev();
            }
        }
    }
    
    setupMouseNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn')) {
                e.preventDefault();
                const page = parseInt(e.target.dataset.page);
                this.navigateToPage(page);
            }
        });
        
        // Add hover effects for navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.showPagePreview(btn.dataset.page);
            });
            
            btn.addEventListener('mouseleave', () => {
                this.hidePagePreview();
            });
        });
    }
    
    setupWheelNavigation() {
        let wheelTimeout;
        let accumulatedDelta = 0;
        
        document.addEventListener('wheel', (e) => {
            if (e.target.closest('.page-content')) {
                e.preventDefault();
                
                clearTimeout(wheelTimeout);
                accumulatedDelta += e.deltaY;
                
                wheelTimeout = setTimeout(() => {
                    if (Math.abs(accumulatedDelta) > 50) {
                        if (accumulatedDelta > 0) {
                            this.navigateNext();
                        } else {
                            this.navigatePrev();
                        }
                        accumulatedDelta = 0;
                    }
                }, 100);
            }
        }, { passive: false });
    }
    
    navigateNext() {
        if (this.app.currentPage < 6) {
            this.navigateToPage(this.app.currentPage + 1);
        }
    }
    
    navigatePrev() {
        if (this.app.currentPage > 1) {
            this.navigateToPage(this.app.currentPage - 1);
        }
    }
    
    navigateToPage(pageNumber) {
        if (this.isNavigating || pageNumber === this.app.currentPage) return;
        
        this.isNavigating = true;
        this.addToHistory(this.app.currentPage);
        
        // Add transition effect
        this.addPageTransitionEffect(pageNumber);
        
        setTimeout(() => {
            this.app.navigateToPage(pageNumber);
            this.updateNavigationIndicators();
            this.announcePageChange(pageNumber);
            this.isNavigating = false;
        }, 300);
    }
    
    addPageTransitionEffect(targetPage) {
        const currentPageEl = document.querySelector(`.page-${this.app.currentPage}`);
        const targetPageEl = document.querySelector(`.page-${targetPage}`);
        
        // Add transition classes
        currentPageEl.classList.add('page-transition-exit');
        targetPageEl.classList.add('page-transition-enter');
        
        // Remove transition classes after animation
        setTimeout(() => {
            currentPageEl.classList.remove('page-transition-exit', 'active');
            targetPageEl.classList.remove('page-transition-enter');
            targetPageEl.classList.add('active');
        }, 300);
    }
    
    updateNavigationIndicators() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.page) === this.app.currentPage) {
                btn.classList.add('active');
            }
        });
        
        // Update progress bar
        this.updateProgressBar();
        
        // Update page indicators
        this.updatePageIndicators();
    }
    
    updateProgressBar() {
        const progress = (this.app.currentPage / 6) * 100;
        const progressBar = document.querySelector('.page-progress');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            
            // Add milestone indicators
            this.updateMilestones(progress);
        }
    }
    
    updateMilestones(progress) {
        const milestones = [16.67, 33.33, 50, 66.67, 83.33, 100];
        milestones.forEach((milestone, index) => {
            if (progress >= milestone) {
                this.addMilestoneClass(index + 1);
            }
        });
    }
    
    addMilestoneClass(pageNumber) {
        const btn = document.querySelector(`.nav-btn[data-page="${pageNumber}"]`);
        if (btn && !btn.classList.contains('milestone-reached')) {
            btn.classList.add('milestone-reached');
        }
    }
    
    updatePageIndicators() {
        const indicators = document.querySelector('.page-indicators');
        if (!indicators) {
            this.createPageIndicators();
        }
        
        document.querySelectorAll('.page-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.app.currentPage);
            indicator.classList.toggle('visited', index + 1 < this.app.currentPage);
        });
    }
    
    createPageIndicators() {
        const container = document.querySelector('.nav-container');
        const indicators = document.createElement('div');
        indicators.className = 'page-indicators';
        
        for (let i = 1; i <= 6; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'page-indicator';
            indicator.title = `Page ${i}`;
            indicator.addEventListener('click', () => {
                this.navigateToPage(i);
            });
            indicators.appendChild(indicator);
        }
        
        container.appendChild(indicators);
    }
    
    showPagePreview(pageNumber) {
        const existingPreview = document.querySelector('.page-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        const preview = document.createElement('div');
        preview.className = 'page-preview';
        preview.innerHTML = `
            <div class="preview-content">
                <h4>Page ${pageNumber}</h4>
                <p>${this.getPageDescription(pageNumber)}</p>
            </div>
        `;
        
        const rect = document.querySelector(`.nav-btn[data-page="${pageNumber}"]`).getBoundingClientRect();
        preview.style.cssText = `
            position: fixed;
            top: ${rect.bottom + 10}px;
            left: ${rect.left}px;
            z-index: 1002;
            transform: translateX(-50%);
        `;
        
        document.body.appendChild(preview);
    }
    
    hidePagePreview() {
        const preview = document.querySelector('.page-preview');
        if (preview) {
            preview.remove();
        }
    }
    
    getPageDescription(pageNumber) {
        const descriptions = {
            1: '표지 - 이름과 직책',
            2: '프로필 & 핵심 역량',
            3: '기술 스택',
            4: '경력',
            5: '대표 프로젝트',
            6: '성과 및 교육'
        };
        return descriptions[pageNumber] || '';
    }
    
    announcePageChange(pageNumber) {
        const announcement = `페이지 ${pageNumber}로 이동했습니다: ${this.getPageDescription(pageNumber)}`;
        
        // Screen reader announcement
        const announcementEl = document.createElement('div');
        announcementEl.setAttribute('aria-live', 'polite');
        announcementEl.setAttribute('aria-atomic', 'true');
        announcementEl.className = 'sr-only';
        announcementEl.textContent = announcement;
        document.body.appendChild(announcementEl);
        
        setTimeout(() => {
            announcementEl.remove();
        }, 1000);
    }
    
    addToHistory(pageNumber) {
        this.navigationHistory.push({
            page: pageNumber,
            timestamp: Date.now()
        });
        
        if (this.navigationHistory.length > this.maxHistorySize) {
            this.navigationHistory.shift();
        }
    }
    
    getNavigationHistory() {
        return [...this.navigationHistory];
    }
    
    goBack() {
        if (this.navigationHistory.length > 1) {
            const previousPage = this.navigationHistory[this.navigationHistory.length - 2].page;
            this.navigateToPage(previousPage);
        }
    }
    
    setupNavigationShortcuts() {
        // Add visual hints for keyboard shortcuts
        const shortcuts = document.createElement('div');
        shortcuts.className = 'keyboard-shortcuts no-print';
        shortcuts.innerHTML = `
            <div class="shortcuts-toggle">
                <i class="fas fa-keyboard"></i>
            </div>
            <div class="shortcuts-panel">
                <h4>단축키</h4>
                <div class="shortcut-item">
                    <kbd>←</kbd> <kbd>→</kbd>
                    <span>페이지 이동</span>
                </div>
                <div class="shortcut-item">
                    <kbd>1</kbd>-<kbd>6</kbd>
                    <span>바로 이동</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Home</kbd>
                    <span>첫 페이지</span>
                </div>
                <div class="shortcut-item">
                    <kbd>End</kbd>
                    <span>마지막 페이지</span>
                </div>
                <div class="shortcut-item">
                    <kbd>T</kbd>
                    <span>테마 전환</span>
                </div>
                <div class="shortcut-item">
                    <kbd>Ctrl</kbd>+<kbd>P</kbd>
                    <span>PDF 내보내기</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(shortcuts);
        
        // Setup toggle
        shortcuts.querySelector('.shortcuts-toggle').addEventListener('click', () => {
            shortcuts.classList.toggle('show');
        });
        
        // Hide on click outside
        document.addEventListener('click', (e) => {
            if (!shortcuts.contains(e.target)) {
                shortcuts.classList.remove('show');
            }
        });
    }
}